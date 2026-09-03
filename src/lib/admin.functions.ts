import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

const statusSchema = z.enum(["new", "reviewing", "contacted", "accepted", "rejected"]);
const idSchema = z.string().uuid("Invalid application id");
const listSchema = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(50).default(20),
  search: z.string().trim().max(120).default(""),
  specialty: z.string().trim().max(80).default(""),
  position: z.string().trim().max(80).default(""),
  status: statusSchema.nullable().default(null),
});

export type ApplicationStatus = Database["public"]["Enums"]["application_status"];

async function requireAdministrator(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", context.userId)
    .eq("role", "administrator")
    .maybeSingle();

  if (error) throw new Error("Could not verify administrator access");
  if (!data) throw new Error("Forbidden");
}

function safeSearch(value: string) {
  return value.replace(/[^a-zA-Z0-9@+_\-\s]/g, " ").trim();
}

export const getAdminOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdministrator(context);
    const statuses: ApplicationStatus[] = ["new", "reviewing", "contacted", "accepted", "rejected"];
    const counts = await Promise.all(
      statuses.map(async (status) => {
        const result = await context.supabase
          .from("applications")
          .select("id", { count: "exact", head: true })
          .eq("status", status);
        if (result.error) throw result.error;
        return [status, result.count ?? 0] as const;
      }),
    );

    const totalResult = await context.supabase.from("applications").select("id", { count: "exact", head: true });
    if (totalResult.error) throw totalResult.error;

    const recentResult = await context.supabase
      .from("applications")
      .select("id, full_name, email, specialty, status, created_at, cv_file_name")
      .order("created_at", { ascending: false })
      .limit(8);
    if (recentResult.error) throw recentResult.error;

    return {
      total: totalResult.count ?? 0,
      counts: Object.fromEntries(counts) as Record<ApplicationStatus, number>,
      recent: recentResult.data ?? [],
    };
  });

export const listApplications = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => listSchema.parse(input))
  .handler(async ({ data, context }) => {
    await requireAdministrator(context);
    const from = (data.page - 1) * data.pageSize;
    const to = from + data.pageSize - 1;
    let query = context.supabase
      .from("applications")
      .select("id, full_name, email, phone, specialty, position, experience_years, english_level, status, created_at, updated_at, cv_file_name", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    const search = safeSearch(data.search);
    if (search) query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
    if (data.specialty) query = query.eq("specialty", data.specialty);
    if (data.position) query = query.eq("position", data.position);
    if (data.status) query = query.eq("status", data.status);

    const { data: applications, count, error } = await query;
    if (error) throw error;
    return {
      applications: applications ?? [],
      total: count ?? 0,
      page: data.page,
      pageSize: data.pageSize,
      totalPages: Math.max(1, Math.ceil((count ?? 0) / data.pageSize)),
    };
  });

export const getApplication = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: idSchema }).parse(input))
  .handler(async ({ data, context }) => {
    await requireAdministrator(context);
    const applicationResult = await context.supabase.from("applications").select("*").eq("id", data.id).maybeSingle();
    if (applicationResult.error) throw applicationResult.error;
    if (!applicationResult.data) throw new Error("Application not found");

    const notesResult = await context.supabase
      .from("application_notes")
      .select("id, application_id, admin_id, note, created_at, updated_at")
      .eq("application_id", data.id)
      .order("created_at", { ascending: false });
    if (notesResult.error) throw notesResult.error;

    return { application: applicationResult.data, notes: notesResult.data ?? [] };
  });

export const updateApplicationStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: idSchema, status: statusSchema }).parse(input))
  .handler(async ({ data, context }) => {
    await requireAdministrator(context);
    const result = await context.supabase
      .from("applications")
      .update({ status: data.status })
      .eq("id", data.id)
      .select("id, status, updated_at")
      .single();
    if (result.error) throw result.error;
    return result.data;
  });

export const addApplicationNote = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: idSchema, note: z.string().trim().min(1, "Note is required").max(2000) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await requireAdministrator(context);
    const result = await context.supabase
      .from("application_notes")
      .insert({ application_id: data.id, admin_id: context.userId, note: data.note })
      .select("id, application_id, admin_id, note, created_at, updated_at")
      .single();
    if (result.error) throw result.error;
    return result.data;
  });

export const createApplicationCvUrl = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: idSchema }).parse(input))
  .handler(async ({ data, context }) => {
    await requireAdministrator(context);
    const result = await context.supabase.from("applications").select("cv_storage_path").eq("id", data.id).maybeSingle();
    if (result.error) throw result.error;
    if (!result.data?.cv_storage_path) return { url: null };
    const signed = await context.supabase.storage.from("candidate-documents").createSignedUrl(result.data.cv_storage_path, 300);
    if (signed.error) throw signed.error;
    return { url: signed.data.signedUrl };
  });

export const deleteApplication = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: idSchema }).parse(input))
  .handler(async ({ data, context }) => {
    await requireAdministrator(context);
    const existing = await context.supabase.from("applications").select("cv_storage_path").eq("id", data.id).maybeSingle();
    if (existing.error) throw existing.error;
    if (!existing.data) throw new Error("Application not found");

    if (existing.data.cv_storage_path) {
      const removed = await context.supabase.storage.from("candidate-documents").remove([existing.data.cv_storage_path]);
      if (removed.error) throw new Error("The CV could not be removed, so the application was kept safe");
    }

    const deleted = await context.supabase.from("applications").delete().eq("id", data.id);
    if (deleted.error) throw deleted.error;
    return { ok: true };
  });

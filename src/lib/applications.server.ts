import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const CV_BUCKET = "candidate-documents";
export const MAX_CV_BYTES = 4 * 1024 * 1024;

const ALLOWED_EXTENSIONS = ["pdf", "doc", "docx"] as const;
const MIME_BY_EXTENSION: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

export type StoredApplicationInput = {
  full_name: string;
  email: string;
  phone: string;
  specialty: string;
  position?: string | null;
  experience_years?: number | null;
  english_level: string;
  additional_information?: string | null;
  cv?: { filename: string; content: string } | null;
};

function safeSegment(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function base64ToBytes(base64: string) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export type SaveResult =
  | { ok: true; id: string; cvStored: boolean; submittedAt: string; status: "new" }
  | { ok: false; reason: "invalid_file" | "file_too_large" | "upload_failed" | "database_error"; message: string };

export async function saveApplication(input: StoredApplicationInput): Promise<SaveResult> {
  let cvPath: string | null = null;
  let cvName: string | null = null;

  if (input.cv) {
    const extension = (input.cv.filename.split(".").pop() || "").toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(extension as (typeof ALLOWED_EXTENSIONS)[number])) {
      return {
        ok: false,
        reason: "invalid_file",
        message: "Your CV must be a PDF or Word document (.pdf, .doc or .docx).",
      };
    }

    let bytes: Uint8Array;
    try {
      bytes = base64ToBytes(input.cv.content);
    } catch {
      return { ok: false, reason: "invalid_file", message: "We could not read the uploaded file." };
    }

    if (bytes.byteLength > MAX_CV_BYTES) {
      return {
        ok: false,
        reason: "file_too_large",
        message: "Your CV file is larger than 4 MB. Please upload a smaller file.",
      };
    }

    const stamp = new Date().toISOString().slice(0, 10);
    const unique = crypto.randomUUID();
    cvName = input.cv.filename.slice(0, 200);
    cvPath = `${stamp}/${unique}-${safeSegment(cvName) || "cv." + extension}`;

    const upload = await supabaseAdmin.storage.from(CV_BUCKET).upload(cvPath, bytes, {
      contentType: MIME_BY_EXTENSION[extension] ?? "application/octet-stream",
      upsert: false,
    });

    if (upload.error) {
      console.error("[applications] CV upload failed", upload.error);
      return {
        ok: false,
        reason: "upload_failed",
        message: "We could not upload your CV. Please try again or email it to contact@crewghpsmanagement.org.",
      };
    }
  }

  const { data, error } = await supabaseAdmin
    .from("applications")
    .insert({
      full_name: input.full_name,
      email: input.email,
      phone: input.phone,
      specialty: input.specialty,
      position: input.position ?? null,
      experience_years: input.experience_years ?? null,
      english_level: input.english_level,
      additional_information: input.additional_information ?? null,
      cv_storage_path: cvPath,
      cv_file_name: cvName,
    })
    .select("id, created_at, status")
    .single();

  if (error || !data) {
    console.error("[applications] insert failed", error);
    if (cvPath) {
      await supabaseAdmin.storage.from(CV_BUCKET).remove([cvPath]);
    }
    return {
      ok: false,
      reason: "database_error",
      message: "We could not save your registration just now. Please try again in a moment.",
    };
  }

  return {
    ok: true,
    id: data.id,
    cvStored: Boolean(cvPath),
    submittedAt: data.created_at,
    status: data.status,
  };
}

export async function findRecentDuplicate(email: string) {
  const since = new Date(Date.now() - 5 * 60 * 1000).toISOString();
  const { data } = await supabaseAdmin
    .from("applications")
    .select("id")
    .eq("email", email)
    .gte("created_at", since)
    .limit(1);
  const first = data?.[0];
  return first?.id ?? null;
}

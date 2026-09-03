import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { sendRegistrationEmail } from "./registration.server";

const registrationSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  phone: z
    .string()
    .trim()
    .min(6, "Phone number is required")
    .max(40)
    .regex(/^[+()\-\s\d]+$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email address").max(255),
  specialty: z.string().trim().min(1).max(80),
  experience: z.string().trim().max(3).default(""),
  english: z.string().trim().min(1).max(40),
  notes: z.string().trim().max(1000).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Privacy acknowledgement is required" }) }),
  cv: z
    .object({
      filename: z.string().trim().min(1).max(200),
      content: z.string().max(7_000_000),
    })
    .nullable()
    .optional(),
});

export type RegistrationResult =
  | { ok: true; duplicate?: boolean; emailDelivered?: boolean }
  | { ok: false; reason: string; message: string };

export const submitRegistration = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => registrationSchema.parse(data))
  .handler(async ({ data }): Promise<RegistrationResult> => {
    const { findRecentDuplicate, saveApplication } = await import("./applications.server");
    const duplicate = await findRecentDuplicate(data.email);
    if (duplicate) {
      return { ok: true, duplicate: true };
    }

    const experienceYears = data.experience === "" ? null : Number(data.experience);

    const saved = await saveApplication({
      full_name: data.name,
      email: data.email,
      phone: data.phone,
      specialty: data.specialty,
      position: null,
      experience_years:
        experienceYears !== null && Number.isFinite(experienceYears) ? experienceYears : null,
      english_level: data.english,
      additional_information: data.notes || null,
      cv: data.cv ?? null,
    });

    if (!saved.ok) {
      return { ok: false, reason: saved.reason, message: saved.message };
    }

    // The database is the source of truth. A failed notification email must never
    // fail the submission, delete the record, or hide it from the admin dashboard.
    let emailDelivered = false;
    try {
      const notification = await sendRegistrationEmail(data, {
        applicationId: saved.id,
        status: "new",
        submittedAt: new Date().toISOString(),
        position: null,
        cvFileName: data.cv?.filename ?? null,
        cvStored: saved.cvStored,
      });
      emailDelivered = notification.ok;
      if (!notification.ok) {
        console.error(
          "[registration] admin notification not delivered",
          notification.reason,
          "application:",
          saved.id,
        );
      }
    } catch (error) {
      console.error("[registration] notification email failed", saved.id, error);
    }

    return { ok: true, emailDelivered };
  });

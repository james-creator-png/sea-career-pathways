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
  | { ok: true; duplicate?: boolean }
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

    try {
      const notification = await sendRegistrationEmail(data);
      if (!notification.ok) {
        return {
          ok: false,
          reason: notification.reason,
          message:
            "Your profile was saved securely, but we could not deliver the notification email. Please email your details and CV to contact@crewghpsmanagement.org.",
        };
      }
    } catch (error) {
      console.error("[registration] notification email failed", error);
      return {
        ok: false,
        reason: "send_failed",
        message:
          "Your profile was saved securely, but we could not deliver the notification email. Please email your details and CV to contact@crewghpsmanagement.org.",
      };
    }

    return { ok: true };
  });

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { sendRegistrationEmail } from "./registration.server";

const registrationSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  phone: z.string().trim().min(5, "Phone number is required").max(40),
  email: z.string().trim().email("Enter a valid email address").max(255),
  specialty: z.string().trim().min(1).max(80),
  experience: z.string().trim().max(3).default(""),
  english: z.string().trim().min(1).max(40),
  notes: z.string().trim().max(1000).optional(),
  cv: z
    .object({
      filename: z.string().trim().min(1).max(200),
      content: z.string().max(7_000_000),
    })
    .nullable()
    .optional(),
});

export const submitRegistration = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => registrationSchema.parse(data))
  .handler(async ({ data }) => sendRegistrationEmail(data));

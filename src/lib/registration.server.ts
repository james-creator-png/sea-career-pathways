export type RegistrationPayload = {
  name: string;
  phone: string;
  email: string;
  specialty: string;
  experience: string;
  english: string;
  notes?: string | undefined;
  cv?: { filename: string; content: string } | null | undefined;
};

const CONTACT_EMAIL = "contact@crewghpsmanagement.org";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendRegistrationEmail(data: RegistrationPayload) {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) {
    return {
      ok: false as const,
      reason: "not_configured" as const,
    };
  }

  const from = process.env["CONTACT_FROM_EMAIL"] || "GHPs Website <onboarding@resend.dev>";

  const rows: Array<[string, string]> = [
    ["Full name", data.name],
    ["Phone / WhatsApp", data.phone],
    ["Email", data.email],
    ["Primary specialty", data.specialty],
    ["Experience (years)", data.experience || "—"],
    ["English proficiency", data.english],
    ["Additional information", data.notes || "—"],
  ];

  const html = `<h2>New candidate registration</h2><table cellpadding="6" style="border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="border:1px solid #ddd"><strong>${escapeHtml(k)}</strong></td><td style="border:1px solid #ddd">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table>`;

  const body: Record<string, unknown> = {
    from,
    to: [CONTACT_EMAIL],
    reply_to: data.email,
    subject: `Candidate registration — ${data.name}`,
    html,
  };

  if (data.cv) {
    body["attachments"] = [{ filename: data.cv.filename, content: data.cv.content }];
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return { ok: false as const, reason: "send_failed" as const };
  }

  return { ok: true as const, reason: "sent" as const };
}

# Migrating the GHPs backend to your own Supabase project

No application code changes are required. Every Supabase access point in the app
reads its URL and keys from environment variables, so pointing the app at your
own project is purely a configuration + schema task.

Nothing in the current Lovable Cloud database is deleted by this process.

---

## 1. Create the project

Supabase Dashboard -> New project. Note the project URL and keys from
Project Settings -> API:

- Project URL (`https://<ref>.supabase.co`)
- Publishable / anon key (safe in the browser)
- Service role key (**server only — never commit, never expose to the client**)

## 2. Create the private storage bucket

Storage -> New bucket:

- Name: `candidate-documents`
- Public: **off**
- File size limit: 5 MB

(The app enforces a stricter 4 MB limit and PDF/DOC/DOCX only.)

## 3. Run the schema

SQL Editor -> New query -> paste and run
`supabase/self-hosted/00_full_schema.sql`.

Creates: `applications`, `application_notes`, `admin_profiles`, `user_roles`,
the `app_role` and `application_status` enums, all indexes, `updated_at`
triggers, `private.has_role()`, all RLS policies, and the storage policies for
`candidate-documents`.

## 4. Create the administrator account

Authentication -> Users -> Add user (email + strong password, auto-confirm).
Then run `supabase/self-hosted/01_grant_administrator.sql` in the SQL Editor.
The final `SELECT` should show the user with role `administrator`.

There is no self-service admin signup — this is intentional.

## 5. Environment variables

### Vercel (Project Settings -> Environment Variables)

| Name | Value | Exposure |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | your project URL | client |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | your anon/publishable key | client |
| `VITE_SUPABASE_PROJECT_ID` | your project ref | client |
| `SUPABASE_URL` | your project URL | server |
| `SUPABASE_PUBLISHABLE_KEY` | your anon/publishable key | server |
| `SUPABASE_SERVICE_ROLE_KEY` | your service role key | **server only** |
| `RESEND_API_KEY` | Resend API key for notification emails | **server only** |
| `CONTACT_TO_EMAIL` | `contact@crewghpsmanagement.org` | server |
| `CONTACT_FROM_EMAIL` | verified Resend sender address | server |

Set all of them for Production **and** Preview, then redeploy.

### Lovable (this editor / preview)

The Lovable preview and the Lovable-published URL are wired to the managed
Cloud backend and cannot be repointed to an external Supabase project from
inside the editor. Practical options:

- Keep Lovable preview on the managed backend (useful for editing/preview) and
  run production on Vercel against your own Supabase project. Recommended.
- Or run the site exclusively from Vercel with your own project and treat the
  Lovable preview as a design environment only.

`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` are still
configured as backend secrets inside Lovable for the preview environment.

## 6. Verification checklist

Against the Vercel deployment pointing at your project:

- [ ] Public site loads unchanged (home, `/privacy`, `/candidate-notice`)
- [ ] Candidate submits the registration form with a PDF CV -> success message
- [ ] Row appears in `applications` with `status = new` and a `cv_storage_path`
- [ ] File exists in the private `candidate-documents` bucket
- [ ] Opening the file's public URL directly fails (bucket is private)
- [ ] Notification email arrives at `contact@crewghpsmanagement.org`
- [ ] `/admin` redirects to `/admin/login` when signed out
- [ ] Admin signs in and sees real counts on the dashboard
- [ ] Applications list search/filter/sort/pagination work
- [ ] Candidate detail: status change persists after refresh
- [ ] Private note saves, shows the author, persists after refresh
- [ ] CV opens via a short-lived signed URL
- [ ] An authenticated user **without** the administrator role is blocked
- [ ] Delete removes the application, its notes, and the stored CV
- [ ] Logout returns to the login page

## 7. Cutover and cleanup

Only after every box above is ticked: repoint DNS / the custom domain to the
Vercel deployment. Keep the Lovable Cloud data untouched as a fallback until
you are satisfied; existing applications there can be exported to CSV and
re-imported into your project's `applications` table if you want history.

## 8. Secrets policy

Service role and Resend keys live only in Vercel environment variables and in
Lovable backend secrets. They appear nowhere in the repository — `.env` is
git-ignored and `.env.example` contains placeholders only.

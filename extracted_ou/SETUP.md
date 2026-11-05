# O&U Interact website

A responsive public website and private content dashboard for Onwards and Upwards Secondary School Interact Club.

## Included
- Public sections: home, about, mission/vision, projects, events, announcements and membership contact.
- Private Supabase email/password admin login.
- Admin can add, edit, publish/unpublish and delete projects, events and news.
- Supabase Row Level Security (RLS) protects private admin actions.
- Mobile responsive layout.

## 1. Preview locally
You can open `index.html` in a browser to preview the design. For the best experience, use a local server:
- Install Visual Studio Code and the **Live Server** extension.
- Open this folder in VS Code.
- Right-click `index.html` → **Open with Live Server**.

The public design previews without Supabase, but live content and admin login require the setup below.

## 2. Create the Supabase backend
1. Create a project at https://supabase.com/.
2. Open **SQL Editor** in your Supabase project.
3. Open `supabase-schema.sql`, copy its entire contents and run it.
4. Go to **Project Settings → API** (or API Keys, depending on the dashboard).
5. Copy the Project URL and the public anon/publishable key. Never use the `service_role` or secret key in browser code.
6. Open `config.js` and replace the two placeholder values:
   - `YOUR_SUPABASE_PROJECT_URL`
   - `YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY`

## 3. Create the first administrator
1. In Supabase, open **Authentication → Users**.
2. Add a user with an email address controlled by the club's authorised teacher/advisor or designated administrator. Set a strong unique password.
3. Copy that user's UUID from the Users list.
4. In SQL Editor, run the following after replacing the UUID:
   ```sql
   insert into public.profiles (id, is_admin)
   values ('PASTE-ADMIN-USER-UUID-HERE', true)
   on conflict (id) do update set is_admin = true;
   ```
5. Do not enable public sign-ups for this admin-only dashboard. Create/administer accounts from the Supabase dashboard. Do not share admin credentials.

## 4. Test
1. Reload the website.
2. Scroll to **Administrator login**.
3. Sign in using the admin email and password.
4. Add a test project and tick “Publish on public website”.
5. Sign out and check that the project is visible in the public Projects section.
6. Try opening the admin page in a private/incognito window; it should not allow management without an authorised account.

## 5. Publish online with Netlify
1. Create a GitHub repository and upload all files in this folder.
2. Sign in at https://app.netlify.com/ and choose **Add new site → Import an existing project**.
3. Connect the GitHub repository.
4. Build command: leave blank. Publish directory: `.` (the repository root).
5. Deploy. Netlify will provide a public `*.netlify.app` URL.
6. You may connect a custom domain later through Netlify's domain settings.

## Security and launch checklist
- Never put a Supabase service-role/secret key in `config.js`, HTML, or any frontend file.
- Keep the admin UUID allowlist controlled by the school advisor/authorised club leadership.
- Use a strong password and enable multi-factor authentication for admin accounts if available.
- Use HTTPS (Netlify provides it).
- Obtain permission before publishing identifiable student photographs or personal information. Avoid publishing private student contact details.
- The sample contact email and stock photo are placeholders; replace them with school-approved details and approved club photographs.
- This starter stores content and image URLs; it does not upload image files. Use trusted image hosting or add a properly secured Supabase Storage workflow later.
- The example content table does not collect student membership applications or sensitive personal data.

## Files
- `index.html` — page structure
- `styles.css` — responsive design
- `app.js` — public content rendering and admin dashboard
- `config.js` — Supabase public project configuration
- `supabase-schema.sql` — database tables and row-level security

# Solomark Nig Ltd website
Static site: `index.html`, `styles.css`, `app.js`, `projects.js`. No build step; deploy the folder root to Vercel.
- Enquiries insert into Supabase table `public.enquiries` (insert-only for the public key). View them in the Supabase dashboard.
- Add real projects in `projects.js` (`SOLOMARK_PROJECTS`); they appear first, unbadged.
- Logos in `assets/logo/`, favicon `favicon.svg`.
- Outstanding: email alerts for new enquiries, custom domain.

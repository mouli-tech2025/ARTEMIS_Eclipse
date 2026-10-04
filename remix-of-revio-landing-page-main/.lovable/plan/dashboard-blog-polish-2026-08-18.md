# Dashboard & blog polish

## Content model

Add two things to blog posts:

- **Author image** — optional avatar for the post author, uploaded to the existing blog images bucket (same uploader as the featured image) or pasted as a URL. Shown next to the author name on the public post page and in the dashboard table.
- **Status** — `draft` or `published`. Drafts are hidden entirely from the public site: excluded from `/blog`, featured/related lists, and a direct slug URL redirects to `/blog`. Admins see all posts in the dashboard with a status badge and can filter by status.

Editor gets a status control plus two save actions: "Save draft" and "Publish" (in edit mode: "Save" and "Publish"/"Unpublish").

## Dashboard

- **Profile inside the dashboard** — `/dashboard/profile` is rebuilt on the dashboard shell (sidebar + header) instead of its current standalone marketing-style layout. Same fields and behavior: name, phone, avatar upload, password change, sign out.
- **Breadcrumbs in the title bar** — the dashboard header shows a breadcrumb trail (e.g. Dashboard / Blog / Edit post, Dashboard / Profile) using the existing shadcn breadcrumb primitive.
- **Always-visible row actions** — the table's edit/delete buttons get persistent visible styling (bordered, muted foreground, no hover-only reveal), with hover only intensifying them.
- **Post title opens the editor** — clicking a post name in the table navigates to the editor, not the public page.
- **New icon-only "View live" action** — an external-link icon button per row linking to the published article in a new tab; disabled/hidden for drafts.

## Auth & avatars

- **Google sign-in enabled** as an auth provider, added to the login and signup pages.
- **SSO profile picture** — on sign-in, if the account has a provider avatar (Google `picture`) and the profile has no avatar yet, it is stored on the profile and shown everywhere instead of the initials monogram. Initials remain the fallback.

## Public site

- **Breadcrumbs on blog pages** — `/blog` and each post page get a visible breadcrumb (Home / Blog / Post title) plus matching `BreadcrumbList` JSON-LD for SEO.
- **Sign in moves out of the main header** — the header no longer shows a Sign In CTA on the marketing site. A small "Admin" link goes in the footer instead. Signed-in users keep the avatar dropdown in the header.
- **No creator promotion in the footer** — the "Design & Developed By Onixtheme / License / Powered By" copyright line is replaced with a plain copyright plus "Made in Lovable". The support email block and newsletter email-related contact fields in the footer are removed.

## Technical notes

- Migration on `blog_posts`: add `author_image text` (nullable) and `status text not null default 'published'` constrained to `draft`/`published` via trigger-free check on static values; replace the public read policy with one that only exposes `status = 'published'`, and add an admin read policy using `has_role`. Grants unchanged for `anon`/`authenticated`.
- `blog-service.ts` gains status-aware queries (public fetchers filter to published; dashboard fetcher returns all) and the new fields in the `BlogPost` types.
- Google provider configured via the auth tooling in the same change so first sign-in works; redirect target is `window.location.origin`.
- Avatar sync happens in `use-auth.tsx` after session hydration, writing `avatar_url` to `profiles` only when empty.

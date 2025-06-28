# Blog CMS with Next.js 14, MongoDB & Next-Auth

## Features
* Admin CRUD with React-Quill rich-text editor
* SEO-friendly slugs & dynamic meta tags
* Secure credentials-based admin auth (Next-Auth)
* MongoDB Atlas via Mongoose
* Server-side HTML sanitisation
* TailwindCSS + Typography plugin

## Getting started
```bash
# 1. clone & install
git clone <repo-url>
cd in_proj
npm install

# 2. env vars
cp .env.local.example .env.local
# fill values: Mongo URI, admin creds, NEXTAUTH_SECRET

# 3. dev
npm run dev
```

## Scripts
* `npm run dev` – turbo / hot-reload dev server on http://localhost:3000
* `npm run build` – production build
* `npm run start` – start prod server

## Deployment (Vercel)
1. Push repository to GitHub.
2. In Vercel Dashboard → **New Project** → import repo.
3. Add the following Environment Variables in **Production & Preview**:
   * `MONGODB_URI`
   * `MONGODB_DB_NAME`
   * `ADMIN_USERNAME`
   * `ADMIN_PASSWORD`
   * `NEXTAUTH_SECRET` – can be generated: `openssl rand -base64 32`
4. Click **Deploy** – Vercel detects Next.js automatically.

## API
| method | endpoint | description |
| ------ | -------- | ----------- |
| GET | `/api/posts` | list all posts |
| POST | `/api/posts` | create post *(auth)* |
| GET | `/api/posts/[slug]` | get single post |
| PUT | `/api/posts/[slug]` | update post *(auth)* |
| DELETE | `/api/posts/[slug]` | delete post *(auth)* |

Payload for create / update:
```json
{
  "title": "My first post",
  "content": "<p>Hello world</p>"
}
```

---
Made with ❤️ and ☕

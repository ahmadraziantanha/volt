# VOLT

Premium wireless audio storefront. Next.js 14 · TypeScript · Tailwind · shadcn/ui · Supabase. Cash on delivery checkout.

## Setup

### 1. Install dependencies

```powershell
npm install
```

### 2. Create a Supabase project

1. Sign in at [supabase.com](https://supabase.com) and create a new project.
2. Once it's ready, open the **SQL Editor** → New query.
3. Paste the contents of [`supabase/migration.sql`](supabase/migration.sql) and run it.
4. New query → paste [`supabase/seed.sql`](supabase/seed.sql) and run it.
5. Verify: `select slug, name, base_price from public.products order by created_at;` returns 7 rows.

### 3. Environment variables

Copy the example file and fill in real values:

```powershell
Copy-Item .env.example .env.local
```

Then edit `.env.local`:

| Key | Where to find it |
|-----|------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase dashboard → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same page → `anon` `public` key |
| `SUPABASE_SERVICE_ROLE_KEY` | Same page → `service_role` `secret` key (server only) |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` for dev |
| `ADMIN_PASSWORD` | Any string. Used to gate `/admin`. |

### 4. Run dev

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project map

```
src/
├── app/                  Pages (App Router). layout.tsx loads fonts + metadata.
├── components/           UI components — built out next iteration.
│   └── ui/               shadcn primitives (added on demand).
├── lib/
│   ├── supabase/         Browser + server clients, hand-written DB types.
│   ├── queries.ts        Server-side data fetching used by pages.
│   └── utils.ts          cn(), formatPrice(), toRoman()…
└── types/                Cross-cutting types (CartItem, etc.).

supabase/
├── migration.sql         Tables, indexes, RLS policies. Paste once.
└── seed.sql              7 products + variants. Paste after migration.

mockup/
└── home.html             Static design reference. Locked design language.
```

## Design tokens

Defined in [`tailwind.config.ts`](tailwind.config.ts) and surfaced as CSS variables in [`src/app/globals.css`](src/app/globals.css):

| Token | Hex | Use |
|-------|-----|-----|
| `bg` | `#0A0A0A` | Page background |
| `surface` | `#0E0E0E` | Raised cards |
| `line` / `line-2` | `#1A1A1A` / `#242424` | Hairline borders |
| `text` | `#FAFAFA` | Headings, primary copy |
| `body` | `#B8B8B8` | Body copy |
| `muted` / `quiet` | `#707070` / `#4A4A4A` | Labels, captions |
| `accent` | `#E4FF1A` | Primary CTA only |

Fonts: **Inter Tight** (display + body) and **JetBrains Mono** (metadata, prices, model codes), both via `next/font/google`.

## Notes

- Cart state lives in `localStorage` + React Context — no backend cart, no user accounts.
- Payment is **cash on delivery only**. Orders are inserted into Supabase from the server with the service-role key (RLS denies anon writes).
- Admin panel is gated by a single shared `ADMIN_PASSWORD`. No Supabase Auth.
- Images are hot-linked from Unsplash. `next.config.mjs` whitelists the host.

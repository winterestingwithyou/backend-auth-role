# Backend Auth Role

Backend API dengan Better Auth dan Hono untuk Cloudflare Workers. Digunakan untuk akun dan manajemen role.

## Setup Project

### 1. Clone Repository

```bash
git clone https://github.com/winterestingwithyou/backend-auth-role.git
cd backend-auth-role
```

### 2. Copy Environment Files

Copy file example untuk development dan production:

```bash
# Copy .env.example ke .env (untuk development)
cp .env.example .env

# Copy .dev.vars.example ke .dev.vars (untuk Wrangler secrets)
cp .dev.vars.example .dev.vars
```

### 3. Konfigurasi Environment Variables

Edit file [.env](.env) dan [.dev.vars](.dev.vars) dengan nilai yang sesuai:

```env
BETTER_AUTH_URL=http://localhost:8787  # URL aplikasi Anda
BETTER_AUTH_SECRET=your-secret-key     # Secret key untuk Better Auth (generate random string)
DATABASE_URL=your-database-url         # URL database (Neon/PostgreSQL)
CORS_ORIGIN=http://localhost:3000      # URL frontend untuk CORS
```

### 4. Install Dependencies

```bash
bun install
```

### 5. Generate Database Schema

Generate schema database untuk Better Auth:

```bash
bun run better-auth-gen-schema
```

### 6. Jalankan Development Server

```bash
bun run dev
```

Server akan berjalan di `http://localhost:8787`

## Commands

### Development

```bash
bun run dev              # Jalankan development server
```

### Type Generation

```bash
bun run cf-typegen       # Generate types dari Worker configuration
```

### Database

```bash
bun run better-auth-gen-schema  # Generate schema Better Auth
```

### Deployment

```bash
bun run deploy           # Deploy ke Cloudflare Workers
```

Perintah deploy akan:
1. Generate types Cloudflare
2. Upload secrets dari `.dev.vars.production`
3. Deploy dengan minifikasi

## Struktur Project

```
backend-auth-role/
├── src/
│   ├── index.ts         # Entry point
│   └── db/
│       └── schema.ts    # Database schema
├── .env                 # Environment variables (development)
├── .dev.vars            # Wrangler secrets (development)
├── wrangler.jsonc       # Konfigurasi Cloudflare Workers
└── better-auth.config.ts # Konfigurasi Better Auth
```

## Tips

- Jangan commit file `.env` dan `.dev.vars` ke repository
- Gunakan `.env.example` dan `.dev.vars.example` sebagai template
- Untuk production, buat file `.dev.vars.production` dengan nilai production

## TypeScript

Pass `CloudflareBindings` sebagai generics saat instantiasi `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```

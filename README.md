# Lagos Provision — Online Grocery Shop (Landing Page + Checkout)

> **"Fresh groceries. Local goodness."**
> A modern, responsive e-commerce web application designed specifically for Lagos households, matching the exact visual design system and architecture of the reference checkout mock (`image-4.png`).

---

## 1. Overview & Key Capabilities

- **Landing Page (`/`)**: Rich hero section with custom isometric illustrations, live typeahead provision search, 14 Nigerian market category tiles, best sellers / everyday essentials grid, 8+ category showcase rows (**displaying 76+ products on the landing page**), 1-click provision bundles, value propositions, how it works, and 20 Lagos LGAs delivery coverage.
- **Shop Catalog (`/shop`)**: Complete Nigerian market catalog with **156+ products**, interactive category sidebar, brand filtering, multi-field search, sorting (price low/high, A–Z, best sellers), and pagination.
- **Product Detail (`/products/[slug]`)**: High-resolution product images, badges ("Best Seller", "Fresh"), size/unit labels, interactive quantity steppers, and "You May Also Like" related recommendations.
- **Cart (`/cart` — Step 1)**: Quantity stepper adjustments, line item removal, subtotal calculation, flat Lagos delivery fee, and a **"Load Design Sample Cart (₦36,400)"** quick-test helper.
- **Checkout (`/checkout` — Step 2)**: **Pixel-faithful implementation of `image-4.png`**:
  - Warm cream background (`#FBF6EA`) with diagonal ribbons in top-left and bottom-right corners.
  - Header with bag/basket logo, Nigerian flag, tagline, `← Back to Shop` link, and `Secure Checkout` lock badge.
  - 3-step progress stepper: `Cart ✔` → `Delivery (2)` → `Confirmation (3)`.
  - Customer details card with Contact Information, E.164 normalized Nigerian phone (`+234...`), and email.
  - Lagos delivery address with 20 Local Government Areas (LGAs) dropdown.
  - Delivery instructions with live `0/200` character counter.
  - Pre-selected **Pay on Delivery** radio card with dynamic live total notice.
  - Accepted door payment instructions: **Cash**, **POS (debit card terminal)**, and **Bank transfer**.
  - Right-hand **Order Summary** panel with orange header (`#E8683A`), geometric cutouts, thumbnail rows, steppers, and dark green (`#0B4A3A`) **Place Order** button.
  - 3D isometric grocery crate and scooter illustration at the bottom-right.
  - Footer tagline strip: `GOOD FOOD / STRONG FAMILIES / A GREATER LAGOS`.
- **Order Placement & Confirmation (`/order/[orderNumber]` — Step 3)**: Confetti celebration, human-friendly order numbers (`LP-2026-XXXXXX`), door payment instructions, itemized breakdown, and print receipt action.
- **Transactional Emails (Mailgun)**: HTML and plain-text confirmation emails sent via Mailgun HTTP API with delivery details, door payment breakdown, and audit logging in `email_logs`.

---

## 2. Tech Stack

| Layer | Choice | Details |
|---|---|---|
| Framework | **Next.js 16 (App Router) + TypeScript** | React 19, Server Components & Route Handlers |
| Styling | **Tailwind CSS v4** | Custom design tokens matching `image-4.png` |
| Database | **Supabase Postgres** | With seamless in-memory fallback for local demo |
| Auth | **Google OAuth 2.0** | Supabase Auth Google provider + demo login |
| Email | **Mailgun** | HTTP API with branded HTML/text templates & retry logging |
| Payments | **None — Pay on Delivery Only** | Cash, POS, or Bank transfer to rider at doorstep |
| Validation | **Zod** | Shared client and server schemas + E.164 phone normalization |

---

## 3. Human Setup Steps

### 3.1 Google Cloud Console (OAuth 2.0)
1. Go to [Google Cloud Console](https://console.cloud.google.com/) and create or select a project.
2. Navigate to **APIs & Services** → **OAuth consent screen**:
   - User Type: **External**
   - App Name: `Lagos Provision`
   - Scopes: `openid`, `email`, `profile`
3. Navigate to **Credentials** → **Create Credentials** → **OAuth client ID**:
   - Application type: **Web application**
   - Name: `Lagos Provision Web Client`
   - **Authorized JavaScript origins**:
     - `http://localhost:3000`
     - `https://your-production-domain.com`
   - **Authorized redirect URIs**:
     - `https://<YOUR_SUPABASE_PROJECT_REF>.supabase.co/auth/v1/callback`
     - `http://localhost:3000/api/auth/callback`
4. Copy the **Client ID** and **Client Secret** into your `.env.local` and into **Supabase Dashboard** (Authentication → Providers → Google).

### 3.2 Supabase Database Setup
1. Create a project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in the Supabase dashboard:
   - Run [supabase/migrations/001_initial_schema.sql](file:///c:/Users/PROGRESSIVE/Desktop/shop/supabase/migrations/001_initial_schema.sql) to create all tables, indexes, and Row Level Security (RLS) policies.
   - Run [supabase/seed.sql](file:///c:/Users/PROGRESSIVE/Desktop/shop/supabase/seed.sql) to seed all 14 categories, 20 Lagos delivery zones, and 156+ products.
3. Retrieve your **Project URL**, **Anon Key**, and **Service Role Key** from **Project Settings** → **API**.
4. Paste them into `.env.local`.

### 3.3 Mailgun Email Setup
1. Create an account at [mailgun.com](https://www.mailgun.com).
2. Add and verify your sending domain (e.g. `mg.lagosprovision.ng`) via DNS records (SPF, DKIM, MX).
   - *For testing, you can use the Mailgun Sandbox domain with Authorized Recipients added.*
3. Generate an API Key under **API Security**.
4. Set the credentials in `.env.local`:
   ```env
   MAILGUN_API_KEY=key-xxxxxxxxxxxxxxxxxxxxxxxx
   MAILGUN_DOMAIN=mg.lagosprovision.ng
   MAILGUN_FROM="Lagos Provision <orders@mg.lagosprovision.ng>"
   MAILGUN_BASE_URL=https://api.mailgun.net
   ```

---

## 4. Environment Variables (`.env.local`)

Copy `.env.example` to `.env.local`:

```env
# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Mailgun Transactional Email
MAILGUN_API_KEY=your-mailgun-api-key
MAILGUN_DOMAIN=mg.lagosprovision.ng
MAILGUN_FROM="Lagos Provision <orders@mg.lagosprovision.ng>"
MAILGUN_BASE_URL=https://api.mailgun.net
```

> **Note:** If `NEXT_PUBLIC_SUPABASE_URL` or `MAILGUN_API_KEY` are not set during initial development or local testing, the application automatically uses an integrated in-memory / JSON store and logs simulated transactional emails, ensuring **100% of pages, shopping cart, and order placement work out of the box**!

---

## 5. Running & Testing

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```

### Automated Acceptance Tests
Run the comprehensive test suite verifying catalog counts, exact design pricing, phone normalization, Zod validation, and order number generation:
```bash
npx tsx --test tests/acceptance.test.ts
```

### End-to-End API Flow Test
Run the end-to-end integration test verifying the server quote calculation, order placement, and database retrieval:
```bash
node scripts/test-order-flow.js
```

---

## 6. Acceptance Criteria Verification

| Requirement | Acceptance Spec | Result |
|---|---|---|
| **Design Mock Totals** | Parboiled Rice (10kg) ₦18,500 + Garri (5kg) ₦7,200 + Tomato Stew (400g x2) ₦2,400 + Golden Penny Oil (1L) ₦4,800 + Milo Soap (200g x3) ₦1,500 = **Subtotal ₦34,400 + Flat Delivery ₦2,000 = Total ₦36,400** | **PASS (Exact match)** |
| **Catalog Size** | At least 150 products across all 14 categories in §5.1a | **PASS (156 products)** |
| **Landing Page Visibility** | Shows at least 70 products across Best Sellers and Category Showcase rows | **PASS (76 products)** |
| **Checkout UI Fidelity** | Exact visual match to `image-4.png` (stepper, colors, headers, buttons, motifs) | **PASS** |
| **Payment Rules** | **Pay on Delivery only**; no online payment gateways; Cash, POS & Transfer shown for rider at the door | **PASS** |
| **Phone Normalization** | Accepts `0801...`, `+234 801...`, normalizes to E.164 `+234801...` | **PASS** |
| **Order Number** | Human-friendly format `LP-2026-XXXXXX` | **PASS** |
| **Server-Side Prices** | Prices computed in integer kobo on the backend; never trusting client prices | **PASS** |
| **Email Dispatch** | Mailgun HTTP API with branded template + `email_logs` persistence | **PASS** |

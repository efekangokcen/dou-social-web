# 🌐 DOU Social — AI-Powered Digital Marketing Agency Platform

> **Full-stack marketing website with AI social media auditing, influencer marketplace, hybrid blog engine, and multi-channel lead generation.**

DOU Social Web is a high-performance, AI-integrated digital marketing platform. It bridges public client acquisition and automated audit intelligence, featuring an automated social media audit engine powered by OpenAI GPT-4o, an influencer portfolio showcase, and localized programmatic SEO landing pages.

**Developed by Ali Efekan Gökcen** | [LinkedIn](https://www.linkedin.com/in/efekangokcen/) | [GitHub](https://github.com/efekangokcen)

---

## ✨ Key Features

- **🤖 AI-Powered Social Media & Marketing Audit**:
  - **Manual Metric Analysis & Vision Mode**: Accepts manual inputs or social media profile screenshots for automated OCR/Vision data extraction via OpenAI GPT-4o.
  - Turkey-specific industry benchmarks (E-commerce, Healthcare, B2B, Gastronomy, Architecture, Manufacturing).
  - Generates 30-60-90 day growth roadmaps, performance scoring (0-100), and client-side downloadable branded PDF reports.
- **👥 Influencer Marketing Hub**:
  - Public creator directory with category filtering, engagement statistics, and embedded video reels.
  - Multi-step influencer application workflow with portfolio validation.
- **📝 Hybrid Blog Engine**:
  - Blended architecture combining local static MDX articles with dynamic cloud-stored articles from Supabase.
  - Structured JSON-LD Article Schema, reading time calculation, and responsive typography.
- **📩 Multi-Channel Lead Generation**:
  - Interactive quote & budget estimation wizard (`/teklif-al`).
  - Digital checkup & brand audit request system.
  - 1-on-1 strategy consultation booking interface.
- **🗺️ Programmatic Local SEO Engine**:
  - Localized landing pages for regional market domination with deep JSON-LD structured schemas (`LocalBusiness`, `Service`, `FAQPage`, `Breadcrumb`).
- **⭐ Live Google Reviews Integration**: Server-side Google Places API integration with Incremental Static Regeneration (ISR) caching.
- **🌍 Internationalization (i18n)**: Native bilingual routing (Turkish & English) via `next-intl`.
- **🛡️ Bot & Spam Defense**: Google reCAPTCHA v3, honeypot fields, and IP-based rate limiting.
- **🎨 Modern Aesthetic**: Micro-interactions with Framer Motion and smooth kinetic scrolling via Lenis.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router, Server Actions, React 19, Turbopack) |
| **Language** | TypeScript 5 |
| **Styling & Motion** | Tailwind CSS v4, Framer Motion, Lenis Smooth Scroll |
| **Cloud Database & Storage** | Supabase (PostgreSQL & Object Storage) |
| **AI / Machine Learning** | OpenAI GPT-4o (Text Generation & Vision Analysis) |
| **External APIs** | Google Places API (New V1), Google reCAPTCHA v3 |
| **Content Engine** | MDX (`next-mdx-remote`, `gray-matter`, `remark-gfm`) |
| **Document Generation** | jsPDF & html2canvas |

---

## 🗄️ Database & Cloud Architecture

The platform connects to a **Supabase Cloud (PostgreSQL)** backend for storing audit histories, dynamic blog posts, case studies, and influencer rosters.

- Real production connection strings are kept in secure cloud environment variables.
- The repository includes all **SQL schema definitions** (`supabase/`) necessary to provision the required tables (`audits`, `contacts`, `blog_posts`, `projects`, `influencer_basvurulari`) and storage buckets.

---

## 🗄️ Step-by-Step Database Setup & Provisioning Guide

To run DOU Social Web with your own backend:

### 1. Create a Supabase Project
- Create a project at [Supabase](https://supabase.com).
- Copy your `Project URL` and `service_role` key from **Settings → API**.

### 2. Setup SQL Schema & Storage Bucket
In **Supabase Dashboard → SQL Editor**, run:
- `supabase/influencers-schema-update.sql` — Creates `influencer_basvurulari` table, indexes, public read policy, and automatically provisions the `influencer-media` storage bucket with demo creator data.

### 3. Configure Environment Variables
```bash
cp .env.example .env.local
```
```env
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"
OPENAI_API_KEY="sk-your-openai-api-key"
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="your-recaptcha-site-key"
RECAPTCHA_SECRET_KEY="your-recaptcha-secret"
GOOGLE_PLACES_API_KEY="your-google-places-api-key"
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ & pnpm / npm
- A Supabase Project
- OpenAI API Key (for the AI audit tool)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/efekangokcen/dou-social-web.git
   cd dou-social-web
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Configure Environment Variables**
   ```bash
   cp .env.example .env.local
   ```
   Add your Supabase URL, Service Key, OpenAI API Key, and reCAPTCHA keys to `.env.local`.

4. **Start Development Server**
   ```bash
   pnpm dev
   ```

---

## 👨‍💻 Developer

**Ali Efekan Gökcen**  
- [LinkedIn Profile](https://www.linkedin.com/in/efekangokcen/)
- [GitHub Profile](https://github.com/efekangokcen)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

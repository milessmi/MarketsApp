Allorca
AI-powered investment education platform for first-time investors.
Built for USC students and Gen Z users with no finance background. Allorca personalizes your learning path based on your risk profile — so you're not reading the same generic content as everyone else.
🔗 Live: https://markets-app.vercel.app ← replace with your actual URL

What It Does
Most investment education platforms dump the same content on every user. Allorca is different — it starts by understanding you.

Onboarding survey — 20 data points collected on your financial goals, risk tolerance, and experience level
Risk scoring algorithm — processes your responses and assigns you one of three investor profiles
Personalized curriculum — your profile unlocks a specific learning path across 15+ educational modules
Progress tracking — quiz system tracks where you are and what you've completed
AI insights (in progress) — Claude API integration for personalized portfolio commentary


Tech Stack
LayerTechnologyFrontendNext.js 14, TypeScript, Tailwind CSSBackendNext.js API routesDatabaseSupabase (PostgreSQL)ORMPrismaAuthSupabase AuthAIClaude API (Anthropic)DeploymentVercel + GitHub CI/CD

Features

Risk scoring engine — onboarding survey data processed through a custom algorithm to dynamically route users into Conservative, Moderate, or Aggressive investor profiles
Authentication — full user auth via Supabase, session management across routes
Educational quiz system — 15+ modules with progress tracking persisted to database
Mobile-responsive UI — fully responsive across devices
Continuous deployment — every push to main auto-deploys via Vercel


Running Locally
bash# Clone the repo
git clone https://github.com/milessmi/Allorca_.git
cd Allorca_

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your Supabase URL, anon key, and Anthropic API key

# Run dev server
npm run dev
Open http://localhost:3000

Environment Variables
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
ANTHROPIC_API_KEY=

About
Allorca is being developed through USC's Stevens Center for Innovation and is a candidate for the NSF Startup Grant. Initial user base targets non-finance USC students — currently at 50+ beta users.
Built by Miles Smith — SWE Intern @ Luma Health, USC Human Biology + AI Minor.

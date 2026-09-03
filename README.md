# RoundsAhead — Pre-health pathway planning for high school students

Pre-health pathway planning for high school students and their families, with
deep-dives for **Physician (MD/DO)**, **Nurse Anesthetist (CRNA)**, **Direct-Entry
Nursing (BSN)**, and other health-career tracks. The buyer is the parent; counselors
are the distribution channel. See `docs/roundsahead-launch-plan.md` and
`docs/roundsahead-marketing-plan.md` for the phased plan and positioning, and
`CLAUDE.md` for the product framing and non-negotiables.

---

## 🚀 Quick Start Guide

To run the application locally on your Mac:

```bash
# 1. Open a terminal in the repo root

# 2. Start the local development server
npm run dev
```

Then open your browser and navigate to: **`http://localhost:3000/app/`**
(the SPA is served under `/app`; the marketing landing page owns `/`).

---

## 🌟 Key Application Features

### 1. 🧭 Junior Year Admissions Launchpad (Dashboard)
- **Holistic Junior Admissions Gauge**: Computes your student's readiness score based on GPA, SAT targets, course rigor, clinical hours, activities, and essay drafts.
- **Priority Action Items**: Highlights immediate 11th-grade priorities (PSAT in October, spring SAT/ACT test prep, hospital volunteering).
- **Application Package Progress**: Real-time progress bar across all chosen target colleges.

### 2. 🩺 Career Pathway Explorer: MD/DO vs. CRNA
- **Side-by-Side Comparison**:
  - **Physician Anesthesiologist (MD/DO)**: 12-13 years post-HS, Pre-Med undergrad major, high medical autonomy, $440k-$550k salary.
  - **Nurse Anesthetist (CRNA)**: 8-9 years post-HS, Direct-Entry BSN, 1-2 years ICU RN experience, 3-year DNP/DNAP doctoral degree, $210k-$265k salary.
- **High School Junior Blueprint**: Detailed checklists of what courses to prioritize in 11th grade for each path.
- **Interactive FAQ**: Answers questions regarding Direct-Entry BSN vs. standard Pre-Nursing, undergraduate major flexibility, and ICU requirements.

### 3. 🔍 Smart College Matcher & Research Hub
- **Dynamic Admissions Categorization**: Calculates whether a school is **🟢 Likely / Safety**, **🟡 Target**, or **🔴 Reach** based on your student's actual unweighted GPA and SAT score.
- **Specialized Filters**:
  - Direct-Entry BSN (guaranteed clinical seats from Day 1)
  - Top Pre-Med advising programs
  - Region (Northeast, South, Midwest, West)
  - Tuition and selectivity
- **Deep-Dive Profiles**: Details on hospital affiliations (e.g. Cleveland Clinic, UPMC, Emory Healthcare, UF Health Shands, Penn Medicine), trauma centers, and application deadlines (EA/ED/RD).
- **Side-by-Side Comparison Matrix**: Compare up to 3 colleges simultaneously.

### 4. 📦 The "Final 5" Application Package Command Center
- **List Balance Advisor**: Ensures a healthy mix (e.g., 2 Safety, 2 Target, 1 Reach).
- **12-Point Checklist per College**:
  1. Common App account added
  2. Official high school transcript requested
  3. Official SAT / ACT scores transmitted
  4. Counselor recommendation requested with Brag Sheet
  5. Teacher Recommendation #1 (Science) requested
  6. Teacher Recommendation #2 (Math/Humanities) requested
  7. Supplemental essays drafted
  8. Supplemental essays polished & proofread
  9. FAFSA submitted
  10. CSS Profile submitted
  11. Application formally submitted & fee paid/waived
  12. Applicant Portal login verified
- **Celebration Confetti**: Triggers celebration when an application package is 100% complete!

### 5. 📅 Junior-to-Senior Milestone Timeline
- **Month-by-Month Roadmap**: From Fall of 11th grade through May 1st National Decision Day of 12th grade.
- **Category Filters**: Standardized testing, academics, clinical volunteering, college visits, recommendations, financial aid.
- **Custom Milestone Adder**: Create custom family tasks with target due dates.
- **College Deadlines Sync**: Automatically syncs Early Action and Regular Decision dates from saved colleges.

### 6. 📄 Resume & Counselor Brag Sheet Generator
- **Dual-Mode Document Builder**:
  - **Teacher & Counselor Brag Sheet**: Specially formatted to hand to teachers in May of 11th grade when requesting recommendation letters.
  - **Standard Academic Activity Resume**: Clean, professional resume for college application portals, summer programs, and scholarships.
- **Export Capabilities**: 1-Click Print, Download as PDF, and Copy formatted text.

### 7. ✍️ Essay & Recommendation Letter Studio
- **Common App 7 Prompts**: Complete breakdown with diagnostic brainstorming questions and healthcare/pre-med angle advice.
- **Supplemental Guides**: Structures and proven outline beats for *Why Nursing (BSN)*, *Why Pre-Med*, and *Why This College*.
- **Live Drafting Workspace**: Word count counter, outline scratchpad, and status tracking.
- **Teacher Recommendation Request Kit**: Pre-formatted, respectful email template that automatically incorporates your student's GPA, course name, and earliest application deadlines.

### 8. 🗺️ Campus Tour Scorecard & Reflection Journal
- Rate campus vibe, simulation labs, pre-med advisor access, dorms, and location safety on a 5-star rubric.
- Log pros, cons, and personal visit notes.

---

## 💾 Data, Sync & Backup

When hosted (see **Deployment** below), all entered data — student profile,
custom activities, essay drafts, college checklists, and tasks — **syncs
automatically to your private cloud account** and is also cached in the browser
so the app keeps working offline. Identity is handled by **Cloudflare Access**,
so each signed-in user gets their own private portfolio without any password to
manage. A small status chip in the top bar shows the current sync state
(`Synced` / `Saving…` / `Offline` / `Local only`).

You can also use the **Backup & Restore** button in the top navigation bar to
copy a full JSON backup file or restore it anytime. Fresh visitors start with a
blank portfolio — use **Load Sample Profile** to populate realistic demo data.

---

## 🚀 Deployment (self-hosted + Cloudflare)

RoundsAhead is packaged as a 3-container Docker stack (`web` nginx + `api`
Node/SQLite + `cloudflared` tunnel) that runs on a Windows host and publishes
securely to a custom domain. See **[DEPLOY.md](./DEPLOY.md)** for the full,
step-by-step guide (tunnel setup, Cloudflare Access, `.env`, launch).

```bash
# On the host, after configuring .env:
docker compose --profile cloudflare up -d --build
```

### Backend (local dev)

```bash
cd server
npm install
npm run dev      # API on http://localhost:4100
```

With no Cloudflare env vars set, the API runs in single-user dev mode. The Vite
dev server proxies `/api` to it automatically.

# Industry & CSR Innovation Hub — Jharkhand

Partnership and funding platform connecting corporations, CSR foundations (Tata Steel, Central Coalfields Ltd, Vedanta, NTPC), technology companies, and MSMEs with university-engineered prototypes and high-impact societal challenges in Jharkhand.

---

## Features
- **Industry Command Center**: Personalized portfolio overview showing CSR capital deployed, matching scores, active partnerships, and pilot progress.
- **Opportunity Marketplace**: Searchable catalog of university prototypes seeking industry co-development, commercialization, or deployment backing.
- **AI Matchmaking**: Intelligent compatibility scoring between corporate CSR priorities and university project capabilities.
- **CSR Funding Workspace**: Milestone-based grant pledging, tranche disbursement tracking, and due diligence verification.
- **Collaboration Workspace**: Joint project monitoring, agreement drafting, and progress reviews between university PIs and corporate mentors.
- **Technology Transfer & Field Deployment**: Track real-world pilot deployments across Jharkhand districts.
- **Express Interest Workflow**: 1-click submission of corporate partnership proposals or mentorship commitments.

---

## Tech Stack
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React, Framer Motion
- **Backend**: Node.js, Express, tsx
- **Persistence**: File-backed JSON store with transactional safety (`server/data/industryStore.ts`)

---

## Default Port
Runs by default on **Port 3004**.

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file based on `.env.example`:
```env
PORT=3004
NODE_ENV=development
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser to: [http://localhost:3004](http://localhost:3004)

### 4. Build for Production
```bash
npm run build
npm start
```

---

## API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status |
| `GET` | `/api/v1/industry/overview` | Industry KPIs, active collaborations, total CSR pledged |
| `GET` | `/api/v1/industry/opportunities` | Searchable university projects and innovation challenges |
| `GET` | `/api/v1/industry/opportunities/:id` | Detailed opportunity profile, TRL stage, and budget |
| `POST` | `/api/v1/industry/opportunities/:id/interest` | Submit partnership / mentorship expression of interest |
| `GET` | `/api/v1/industry/collaborations` | Active corporate-academic collaboration agreements |
| `POST` | `/api/v1/industry/funding/pledge` | Pledge milestone-based CSR grant |
| `GET` | `/api/v1/industry/audit-logs` | Operational corporate audit trail |
| `GET` | `/api/v1/public/overview` | Statewide public overview stats |
| `GET` | `/api/v1/public/map` | Geospatial GeoJSON of state challenges |

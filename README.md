# Noel Group | Specialised Recruitment Platform

A premium, enterprise-grade recruitment management platform built for **Noel Group**, Ireland's leading specialized recruitment agency. This application is architected for high-performance, scalability, and production-ready deployment via **Docker** and **AWS**.

---

## 🚀 Technical Architecture

- **Frontend**: Next.js 15+ (App Router) with React 19.
- **Database**: PostgreSQL 16 (Relational infrastructure with connection pooling).
- **Styling**: Vanilla CSS for bespoke, magazine-style high-fidelity design.
- **Infrastructure**: Fully Containerized (Docker) for seamless AWS orchestration.

---

## 🛠️ Key Features

- **Magazine-Style Candidate Registration**: A high-conversion, multi-step application flow with micro-animations.
- **Unified Agent Dashboard**: 
    - Real-time pipeline management (Pending, Approved, Disapproved).
    - **Dedicated Profile Views**: Full-page, responsive candidate detailed records.
    - Status synchronization between Agents and Candidates.
- **Candidate Portal**: Personal dashboard for applicants to track their status and get real-time feedback.
- **Smart Navigation**: Context-aware header system for Agents, Candidates, and new visitors.

---

## 📦 Getting Started (Local Development)

### 1. Prerequisites
- [Docker & Docker Compose](https://www.docker.com/products/docker-desktop/)
- Node.js 20+ (optional for local running)

### 2. Launch with Docker Compose
The simplest way to run the entire stack (App + PostgreSQL) is via Docker:

```bash
docker-compose up -d
```
*This will automatically initialize the database using the `schema.sql` file.*

### 3. Environment Configuration
Create a `.env` file based on `.env.example`:
```bash
POSTGRES_URL=postgresql://postgres:postgres@localhost:5432/noelgroup
NODE_ENV=development
```

---

## ☁️ Production Deployment

This project is optimized for **AWS** (ECS Fargate / App Runner) rather than Vercel. 

- **Dockerfile**: Includes a multi-stage production build for minimal image size.
- **PostgreSQL**: Designed to connect to AWS RDS via connection strings.
- **Infrastructure Guide**: See the detailed [INFRA_GUIDE.md](./INFRA_GUIDE.md) for step-by-step AWS provisioning.

---

## 📂 Repository Structure

- `/src/app`: Next.js App Router (Routes & Server Components).
- `/src/components`: Bespoke UI components and Smart Navigation.
- `/src/lib/db.ts`: PostgreSQL Connection Pool (Singleton).
- `schema.sql`: Database schema and initial seed data.
- `docker-compose.yml`: Local infrastructure orchestration.

---

© 2026 Noel Group Ireland. Professional. Reliable. Specialist.

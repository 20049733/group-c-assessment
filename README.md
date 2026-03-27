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

## Cloud Deployment on AWS

### Technical Architecture

| Layer | Technology |
|---|---|
| Frontend & Backend | Next.js 16 (App Router, Server Components) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Database | PostgreSQL 16 |
| Runtime | Node.js 20 |
| Containerisation | Docker + Docker Compose |
| Reverse Proxy | Nginx 1.25 |
| Cloud Infrastructure | AWS EC2 (eu-west-1) |

---

The production setup uses **two EC2 instances** in the same AWS VPC:

| Instance | Purpose | Recommended Type |
|---|---|---|
| App Server | Next.js + Nginx via Docker | t3.small or c7i-flex.large |
| Database Server | PostgreSQL 16 | t3.medium or m7i-flex.large |

### High-Level Deployment Steps

**1. Database EC2**
- Launch Ubuntu 24.04 EC2
- Create a new Security Group called 'noelgroup-postgres-sg' allow port 22 from your IP only
- Install PostgreSQL 16
```
SSH into the Postgres EC2:
ssh -i your-key.pem ubuntu@<postgres-ec2-public-ip>

sudo apt update && sudo apt upgrade -y
sudo apt install -y postgresql-16
sudo systemctl enable postgresql
sudo systemctl start postgresql
```
- Configure Postgresql
```
sudo -u postgres psql
ALTER USER postgres WITH PASSWORD 'yourStrongPassword';
CREATE DATABASE noelgroup;
\q
```
- Configure `postgresql.conf` to set `listen_addresses = '*'`
```
Edit the PostgreSQL config to listen on all interfaces:
sudo nano /etc/postgresql/16/main/postgresql.conf

Find and change:
listen_addresses = 'localhost'   →   listen_addresses = '*'
```
- Update `pg_hba.conf` to allow the Application EC2's private IP on port 5432
```
Edit pg_hba.conf to allow the app EC2's private IP:
sudo nano /etc/postgresql/16/main/pg_hba.conf

Add this line at the bottom (replace with your App EC2 private IP):
host    noelgroup    postgres    <app-ec2-private-ip>/32    md5
```
- Copy the schema into the database EC2
- Chamge the permissions for the schema and the directory
```
chomd 644 /home/ubuntu/schema.sql
chmod 755 /home/ubuntu
``` 
- Load the schema:
```
sudo -u postgres psql -d noelgroup -f schema.sql
```
- In the inbound rule for the Database EC2 Security group: allow port 5432 from App EC2 private IP only

**2. App EC2**
- Launch Ubuntu 24.04 EC2
- Install Docker and Docker Compose
```
SSH into the App EC2:
ssh -i your-key.pem ubuntu@<app-ec2-public-ip>

Install Docker:
sudo apt update && sudo apt upgrade -y
sudo apt install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

Add ubuntu user to docker group (so you don't need sudo):
sudo usermod -aG docker ubuntu
newgrp docker

Verify Docker is running:
docker --version
docker compose version
```
- Clone this repository
```
On the App EC2, clone the repository:
git clone https://github.com/20049733/group-c-assessment.git
cd group-c-assessment
```
- Create `.env` with the Postgres EC2's **private IP** in `POSTGRES_URL`
```
cp .env.example .env
nano .env

Edit the .env:
POSTGRES_URL: postgresql://postgres:yourStrongPassword@<postgres-ec2-private-ip>:5432/noelgroup
NODE_ENV: production
```
- Run:
```
docker compose up -d --build
docker compose ps
docker compose logs -f
```
- Security group: allow port 80 (HTTP) from anywhere, port 22 (SSH) from your IP only
- Test Nginx is responding:
```
From your local machine, open a browser and navigate to:
http://<app-ec2-public-ip>
You should see the Noel Group application homepage.

```

---

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `POSTGRES_URL` | Full PostgreSQL connection string | `postgresql://postgres:password@172.31.x.x:5432/noelgroup` |
| `NODE_ENV` | Application environment | `production` |

> **Never commit your `.env` file to version control.**

---

## Docker Reference

| Command | Description |
|---|---|
| `docker compose up -d --build` | Build images and start all containers |
| `docker compose ps` | Show container status |
| `docker compose logs -f app` | Stream app logs |
| `docker compose logs -f nginx` | Stream Nginx logs |
| `docker compose down` | Stop and remove all containers |
| `docker compose restart app` | Restart the app container |
| `docker exec -it noelgroup_app sh` | Open shell inside app container |

---

## Scaling Recommendations

The current architecture runs on two EC2 instances and is suitable for moderate traffic. Below are recommended upgrades for higher availability and fault tolerance.

### Application Server Scaling

The single App EC2 is a potential bottleneck under high traffic. To scale it:

**Option 1 — Auto Scaling Group (ASG) + Application Load Balancer (ALB)**

This is the AWS-native approach for horizontal scaling:

1. Create an **AMI** (snapshot) of your working App EC2 with Docker and the app pre-installed.
2. Create a **Launch Template** using that AMI.
3. Create an **Auto Scaling Group** with a minimum of 1 and maximum of N instances using the launch template.
4. Place an **Application Load Balancer** in front of the ASG to distribute incoming traffic across all healthy instances.
5. If one instance fails, the ASG automatically replaces it. If traffic spikes, it automatically adds more.

```
Internet → ALB (port 80) → ASG → [App EC2 #1, App EC2 #2, App EC2 #N]
```

**Option 2 — Vertical Scaling**

Simply stop the App EC2, change the instance type to a larger one (e.g. `c7i-flex.xlarge`), and restart. Simpler but still a single point of failure.

---

### Database Server Scaling

A single Postgres EC2 is a single point of failure — if it goes down, the entire application goes down.

**Recommended: Migrate to AWS RDS**

AWS RDS (Relational Database Service) is a fully managed PostgreSQL service that handles backups, patching, and failover automatically.

Benefits over a self-managed EC2 Postgres:
- **Automatic backups** — daily snapshots with point-in-time recovery
- **Multi-AZ deployment** — a standby replica in a different availability zone; automatic failover in ~60 seconds if the primary fails
- **Read replicas** — offload read-heavy queries to separate replica instances
- **No manual maintenance** — AWS handles OS patching and Postgres upgrades

**Migration steps:**
1. Create an RDS Postgres 16 instance (`db.t3.micro` is free tier eligible)
2. Set the security group to allow port 5432 from the App EC2 private IP
3. Update `POSTGRES_URL` in your App EC2's `.env` to point at the RDS endpoint
4. Run `schema.sql` against the RDS instance to initialise the schema
5. Restart the app containers: `docker compose down && docker compose up -d`

**Recommended production database architecture:**

```
App EC2 / ASG
    │
    ▼
RDS Primary (Multi-AZ)
    │
    ├── Standby Replica (different AZ — automatic failover)
    └── Read Replica (optional — for read-heavy workloads)
```

---

## Repository Structure

```
group-c-assessment/
├── src/
│   ├── app/              # Next.js App Router — routes and server components
│   ├── components/       # Reusable UI components and smart navigation
│   └── lib/
│       └── db.ts         # PostgreSQL connection pool (singleton)
├── public/               # Static assets
├── schema.sql            # Database schema and seed data
├── Dockerfile            # Multi-stage production Docker build
├── docker-compose.yml    # Production container orchestration
├── nginx.conf            # Nginx reverse proxy configuration
├── next.config.ts        # Next.js configuration (standalone output)
├── .env.example          # Environment variable template
└── INFRA_GUIDE.md        # Detailed AWS infrastructure guide
```

---

© 2026 Noel Group Ireland. Professional. Reliable. Specialist.

# Infrastructure & Deployment Guide: Noel Group

This guide provides instructions for AWS/Docker engineers to provision the PostgreSQL database and deploy the Noel Group Next.js application.

---

## 🐘 Database Provisioning (PostgreSQL)

### 1. Locally with Docker
If you want to run the database locally for testing:
```bash
docker run --name noel-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=noelgroup -p 5432:5432 -d postgres:16
```

### 2. AWS RDS (Recommended for Production)
1. **Engine**: PostgreSQL 16+.
2. **Instance Class**: `db.t3.micro` is sufficient for initial load.
3. **Public Access**: No (ensure the API can reach it via VPC).
4. **Environment Configuration**: Export the `POSTGRES_URL` connection string.

### 3. Schema Setup
Run the following against the new database:
```bash
psql -h <host> -U <user> -d noelgroup -f schema.sql
```

---

## 🐳 Application Deployment (Docker)

### 1. Environment Variables
Ensure the following variables are provided to the container:
- `POSTGRES_URL`: The full connection string (`postgres://user:pass@host:5432/db`)
- `NODE_ENV`: `production`

### 2. Build & Run
```bash
# Build the image
docker build -t noel-group-app .

# Run the container
docker run -p 3000:3000 --env-file .env noel-group-app
```

---

## ☁️ AWS Orchestration (ECS / App Runner)

### ECS (Fargate)
- **Task Definition**: Use the image from ECR.
- **Port Mapping**: Map port 3000.
- **Secrets Manager**: Store `POSTGRES_URL` in Secrets Manager and inject it into the container environment.

### App Runner (Simplest)
1. Connect your GitHub repository.
2. Select "Runtime: Nodejs 18 or 20".
3. Add the `POSTGRES_URL` to the Environment Variables settings.
4. App Runner handles the SSL and Load Balancing automatically.

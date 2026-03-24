-- Noel Group PostgreSQL Schema

-- Drop tables if they exist (for a fresh start)
DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS agents;

-- 1. Agents Table
CREATE TABLE agents (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Applications Table
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    sector VARCHAR(100),
    work_history TEXT,
    education TEXT,
    references_text TEXT,
    password VARCHAR(255), -- Added for candidate status portal
    status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Seed Data
-- Default Agent
INSERT INTO agents (name, email, password) 
VALUES ('Noel Admin', 'agent@noel.ie', 'password');

-- Demo Applicants
INSERT INTO applications (first_name, last_name, email, phone, sector, work_history, education, references_text, password, status)
VALUES 
('Liam', 'O''Connor', 'liam@example.ie', '+353 87 111 2222', 'Industrial', 
 'Senior Logistics Coordinator at Dublin Freight (2018-2023). Managed a team of 15. Forklift and Heavy Vehicle certified.',
 'BSc Logistics, TU Dublin (2014-2018)',
 'John Smith (Manager) - j.smith@freight.ie', 
 'password', 'PENDING'),
('Sarah', 'Kelly', 'sarah@example.ie', '+353 85 999 8888', 'Healthcare',
 'Registered Nurse at St. James Hospital (2015-2024). Specialized in Geriatric care and emergency response.',
 'Bachelor of Nursing, UCD (2011-2015). Advanced Life Support (ALS) Certified.',
 'Dr. Mary Byrne - m.byrne@stjames.ie',
 'password', 'APPROVED');

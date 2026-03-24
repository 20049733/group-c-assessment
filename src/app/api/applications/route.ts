import db from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const applications = await db.getAll('SELECT * FROM applications ORDER BY created_at DESC');
    return NextResponse.json(applications);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      sector, 
      workHistory, 
      education, 
      references,
      password 
    } = body;

    const query = `
      INSERT INTO applications (first_name, last_name, email, phone, sector, work_history, education, references_text, password)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id
    `;

    const result = await db.getOne(query, [firstName, lastName, email, phone, sector, workHistory, education, references, password]);

    return NextResponse.json({ id: result.id, success: true });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}

import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const candidate = await db.getOne(
      'SELECT * FROM applications WHERE email = $1 AND password = $2', 
      [email, password]
    );

    if (candidate) {
      return NextResponse.json({ user: candidate, success: true });
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}

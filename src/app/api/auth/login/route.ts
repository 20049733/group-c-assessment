import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const agent = await db.getOne(
      'SELECT * FROM agents WHERE email = $1 AND password = $2', 
      [email, password]
    );

    if (agent) {
      return NextResponse.json({ user: agent, success: true });
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}

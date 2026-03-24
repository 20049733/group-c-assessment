'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CandidateLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/candidate-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('candidateId', data.user.id);
        router.push('/candidate-dashboard');
      } else {
        setIsLoading(false);
        alert('Invalid Candidate credentials. \nHint: liam@example.ie / password');
      }
    } catch (error) {
       setIsLoading(false);
       alert('An error occurred.');
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--ink-50)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
       <div className="card" style={{ width: '100%', maxWidth: '440px', padding: '4rem' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ink-500)', textDecoration: 'none', marginBottom: '2rem', fontSize: '0.9rem' }}>
             <ArrowLeft size={16} /> Back
          </Link>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Check Status</h2>
          <p style={{ color: 'var(--ink-500)', marginBottom: '3rem' }}>Login to see your application progress.</p>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-input" placeholder="liam@example.ie" required />
            </div>
            <div style={{ marginBottom: '2.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-input" placeholder="••••••••" required />
            </div>

            <button disabled={isLoading} className="btn btn-primary" style={{ width: '100%', padding: '1.25rem', borderRadius: 'var(--radius-full)' }}>
               {isLoading ? <Loader2 className="animate-spin" /> : <>Login to Portal <ArrowRight size={18} /></>}
            </button>
          </form>
       </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        localStorage.setItem('agentId', '1'); // Mock agent session
        router.push('/dashboard');
      } else {
        setIsLoading(false);
        alert('Invalid Agent credentials. \nHint: agent@noelgroup.ie / password');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during login.');
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '450px', 
        backgroundColor: '#fff', 
        padding: '3.5rem', 
        borderRadius: '24px', 
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <img src="/noel-logo.png" alt="Noel Group" style={{ height: '32px', margin: '0 auto 1.5rem' }} />
          </Link>
          <div style={{ height: '4px', width: '40px', backgroundColor: '#ED1C24', margin: '0 auto 1.5rem', borderRadius: '2px' }}></div>
          <h2 style={{ fontSize: '1.5rem', color: '#1a1a1a', fontWeight: '700' }}>Agent Login</h2>
          <p style={{ color: '#888', marginTop: '0.5rem' }}>Welcome back! Please enter your details.</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label" style={{ color: '#444', fontSize: '0.9rem' }}>Agent Email</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} />
              <input 
                type="email" 
                className="form-input" 
                style={{ height: '56px', paddingLeft: '48px', backgroundColor: '#fbfbfb', border: '1px solid #eee' }}
                placeholder="agent@noelgroup.ie"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label className="form-label" style={{ color: '#444', fontSize: '0.9rem', marginBottom: 0 }}>Password</label>
              <a href="#" style={{ fontSize: '0.8rem', color: '#ED1C24', fontWeight: 600 }}>Forgot password?</a>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} />
              <input 
                type="password" 
                className="form-input" 
                style={{ height: '56px', paddingLeft: '48px', backgroundColor: '#fbfbfb', border: '1px solid #eee' }}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required 
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="btn btn-primary" 
            style={{ 
              width: '100%', 
              height: '56px', 
              fontSize: '1.1rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '10px',
              opacity: isLoading ? 0.8 : 1,
              backgroundColor: 'var(--noel-red)',
              borderRadius: 'var(--radius-full)'
            }}
          >
            {isLoading ? <Loader2 size={24} className="animate-spin" /> : <>Sign In <ArrowRight size={20} /></>}
          </button>
        </form>

        <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.85rem', color: '#888' }}>
            Not an agent? <Link href="/candidate-registration" style={{ color: '#ED1C24', fontWeight: 600 }}>Register as a Jobseeker</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

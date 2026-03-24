'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Clock, XCircle, ArrowLeft, LogOut, FileText, User, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function CandidateDashboard() {
  const [application, setApplication] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchStatus = async () => {
      const id = localStorage.getItem('candidateId');
      if (!id) {
         router.push('/candidate-login');
         return;
      }
      try {
        // Force no-cache to ensure we see the agent's update immediately
        const res = await fetch(`/api/applications/${id}`, { cache: 'no-store' });
        const data = await res.json();
        setApplication(data);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
    
    // Optional: Poll every 30 seconds if pending
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'APPROVED': return { color: '#10b981', bg: '#ecfdf5', icon: <CheckCircle size={48} />, text: 'Great news! Your application has been approved. Our team will contact you shortly with the next steps.' };
      case 'REJECTED': return { color: '#ef4444', bg: '#fef2f2', icon: <XCircle size={48} />, text: 'Thank you for your interest. Unfortunately, we will not be moving forward with your application at this time.' };
      default: return { color: '#f59e0b', bg: '#fffbeb', icon: <Clock size={48} />, text: 'Your application is currently being reviewed by our specialist agents. Please check back soon!' };
    }
  };

  if (isLoading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', backgroundColor: '#fff' }}>
      <Loader2 className="animate-spin" size={32} color="var(--noel-red)" />
      <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Loading Application Status...</span>
    </div>
  );

  if (!application) return (
    <div style={{ padding: '4rem', textAlign: 'center' }}>
       <p>Application data not found. Please log in again.</p>
       <button onClick={() => router.push('/candidate-login')} className="btn btn-primary" style={{ marginTop: '1rem' }}>Login</button>
    </div>
  );

  const style = getStatusStyle(application.status);

  return (
    <div style={{ backgroundColor: 'var(--ink-50)', minHeight: '100vh', padding: '6rem 2rem' }}>
       <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
             <div>
                <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Hello, {application.first_name}</h1>
                <p style={{ color: 'var(--ink-500)', fontSize: '1.1rem' }}>Candidate Portal • App ID: #{application.id}</p>
             </div>
             <button onClick={() => { localStorage.removeItem('candidateId'); router.push('/'); }} className="btn btn-secondary" style={{ borderRadius: 'var(--radius-full)', padding: '1rem 2rem', backgroundColor: '#fff', border: '1px solid var(--ink-200)', color: 'var(--ink-900)' }}>
                <LogOut size={18} /> Logout
             </button>
          </div>

          <div className="card" style={{ padding: '5rem', borderRadius: '40px', backgroundColor: '#fff', border: '1px solid var(--ink-100)', boxShadow: '0 30px 60px -12px rgba(0,0,0,0.05)', textAlign: 'center' }}>
             <div style={{ color: style.color, marginBottom: '3rem', display: 'flex', justifyContent: 'center' }}>
                {style.icon}
             </div>
             <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 800 }}>Status: {application.status}</h2>
             <p style={{ fontSize: '1.25rem', color: 'var(--ink-600)', marginBottom: '4rem', lineHeight: '1.6', maxWidth: '500px', margin: '0 auto 4rem' }}>
                {style.text}
             </p>

             <div style={{ borderTop: '1px solid var(--ink-100)', paddingTop: '4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', textAlign: 'left' }}>
                <div>
                   <h5 style={{ textTransform: 'uppercase', color: 'var(--ink-400)', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em', marginBottom: '1rem' }}>Sector</h5>
                   <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>{application.sector || 'General Recruitment'}</p>
                </div>
                <div>
                   <h5 style={{ textTransform: 'uppercase', color: 'var(--ink-400)', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em', marginBottom: '1rem' }}>Submitted On</h5>
                   <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>{new Date(application.created_at).toLocaleDateString()}</p>
                </div>
             </div>
          </div>

          <div style={{ marginTop: '4rem', textAlign: 'center' }}>
             <p style={{ color: 'var(--ink-400)', fontSize: '0.9rem' }}>
                Need to update your details? Contact us at <a href="mailto:support@noelgroup.ie" style={{ color: 'var(--noel-red)', textDecoration: 'none', fontWeight: 600 }}>support@noelgroup.ie</a>
             </p>
          </div>
       </div>
    </div>
  );
}

'use client';

import { useState, useEffect, use } from 'react';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck, 
  CheckCircle, 
  XCircle,
  Clock,
  ExternalLink,
  Loader2,
  ArrowRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CandidateProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [candidate, setCandidate] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const res = await fetch(`/api/applications/${id}`, { cache: 'no-store' });
        const data = await res.json();
        setCandidate(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCandidate();
  }, [id]);

  const updateStatus = async (status: string) => {
    setIsUpdating(status);
    try {
      const response = await fetch(`/api/applications/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        setCandidate({ ...candidate, status });
        // Immediate feedback then redirect
        setTimeout(() => router.push('/dashboard'), 800);
      } else {
        alert('Failed to update status. Please try again.');
        setIsUpdating(null);
      }
    } catch (error) {
      console.error('Failed to update:', error);
      setIsUpdating(null);
    }
  };

  if (isLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', backgroundColor: '#fff' }}>
        <Loader2 className="animate-spin" size={32} color="var(--noel-red)" />
        <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Loading Candidate Profile...</span>
      </div>
    );
  }

  if (!candidate) return <div style={{ padding: '4rem', textAlign: 'center' }}>Candidate not found.</div>;

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'APPROVED': return { color: '#10b981', bg: '#ecfdf5', icon: <CheckCircle size={20} /> };
      case 'REJECTED': return { color: '#ef4444', bg: '#fef2f2', icon: <XCircle size={20} /> };
      default: return { color: '#f59e0b', bg: '#fffbeb', icon: <Clock size={20} /> };
    }
  };

  const statusInfo = getStatusInfo(candidate.status);

  return (
    <div style={{ backgroundColor: 'var(--ink-50)', minHeight: '100vh', padding: '0 0 10rem' }}>
      
      {/* Header / Banner */}
      <div style={{ backgroundColor: 'var(--ink-900)', color: '#fff', padding: '4rem 0 8rem' }}>
         <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
            
            <Link 
              href="/dashboard" 
              className="back-link"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                color: '#fff', // High contrast white
                textDecoration: 'none', 
                marginBottom: '3rem', 
                fontSize: '1rem', 
                fontWeight: 700,
                opacity: 0.9,
                width: 'fit-content'
              }}
            >
               <ArrowLeft size={20} /> Back to Dashboard
            </Link>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
               <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                     <div style={{ width: '80px', height: '80px', borderRadius: '24px', backgroundColor: 'var(--accent-mint)', color: 'var(--ink-900)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 800 }}>
                        {candidate.first_name.charAt(0)}
                     </div>
                     <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '50px', backgroundColor: statusInfo.bg, color: statusInfo.color, fontSize: '0.85rem', fontWeight: 800 }}>
                        {statusInfo.icon} {candidate.status}
                     </div>
                  </div>
                  <h1 className="text-giant" style={{ fontSize: '4rem', color: '#fff', marginBottom: '0.5rem' }}>{candidate.first_name} {candidate.last_name}</h1>
                  <p style={{ fontSize: '1.25rem', opacity: 0.7 }}>{candidate.sector} Specialist • Applied {new Date(candidate.created_at).toLocaleDateString()}</p>
               </div>
               
               <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    onClick={() => updateStatus('REJECTED')} 
                    disabled={!!isUpdating} 
                    className="btn" 
                    style={{ 
                      padding: '1.25rem 2.5rem', 
                      borderRadius: '50px', 
                      backgroundColor: 'rgba(255,255,255,0.1)', 
                      color: '#fff', 
                      border: '1px solid rgba(255,255,255,0.2)', 
                      fontWeight: 700,
                      cursor: isUpdating ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isUpdating === 'REJECTED' ? <Loader2 className="animate-spin" size={18} /> : 'Disapprove'}
                  </button>
                  <button 
                    onClick={() => updateStatus('APPROVED')} 
                    disabled={!!isUpdating} 
                    className="btn" 
                    style={{ 
                      padding: '1.25rem 3rem', 
                      borderRadius: '50px', 
                      backgroundColor: 'var(--noel-red)', 
                      color: '#fff', 
                      border: 'none', 
                      fontWeight: 700, 
                      boxShadow: '0 15px 30px -10px rgba(237, 28, 36, 0.4)',
                      cursor: isUpdating ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isUpdating === 'APPROVED' ? <Loader2 className="animate-spin" size={18} /> : 'Approve Candidate'}
                  </button>
               </div>
            </div>
         </div>
      </div>

      {/* Profile Content */}
      <div className="container" style={{ maxWidth: '1000px', margin: '-4rem auto 0', padding: '0 2rem' }}>
         <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', alignItems: 'start' }}>
            
            <div style={{ display: 'grid', gap: '2rem' }}>
               <div className="card-custom" style={{ padding: '4rem' }}>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--ink-100)', paddingBottom: '1.5rem' }}>
                     <Briefcase size={24} color="var(--noel-red)" /> Work History
                  </h3>
                  <p style={{ lineHeight: '1.8', color: 'var(--ink-700)', fontSize: '1.1rem', whiteSpace: 'pre-wrap' }}>
                     {candidate.work_history}
                  </p>
               </div>

               <div className="card-custom" style={{ padding: '4rem' }}>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--ink-100)', paddingBottom: '1.5rem' }}>
                     <GraduationCap size={24} color="var(--noel-red)" /> Education & Certification
                  </h3>
                  <p style={{ lineHeight: '1.8', color: 'var(--ink-700)', fontSize: '1.1rem', whiteSpace: 'pre-wrap' }}>
                     {candidate.education}
                  </p>
               </div>

               <div className="card-custom" style={{ padding: '4rem', backgroundColor: 'var(--accent-mint)', border: 'none' }}>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '1.5rem', color: 'var(--ink-900)' }}>
                     <ShieldCheck size={24} /> Verified References
                  </h3>
                  <p style={{ lineHeight: '1.8', color: 'var(--ink-900)', fontSize: '1.1rem', fontWeight: 600 }}>
                     {candidate.references_text}
                  </p>
               </div>
            </div>

            <aside style={{ display: 'grid', gap: '2rem' }}>
               <div className="card-custom" style={{ padding: '2.5rem' }}>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-400)', marginBottom: '2rem' }}>Contact Information</h4>
                  <div style={{ display: 'grid', gap: '2rem' }}>
                     <div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--ink-400)', marginBottom: '4px' }}>Email</p>
                        <p style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                           <Mail size={16} color="var(--noel-red)" /> {candidate.email}
                        </p>
                     </div>
                     <div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--ink-400)', marginBottom: '4px' }}>Phone</p>
                        <p style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                           <Phone size={16} color="var(--noel-red)" /> {candidate.phone}
                        </p>
                     </div>
                     <button className="btn btn-secondary" style={{ width: '100%', marginTop: '1rem', borderRadius: '12px', padding: '1rem' }}>
                        Send Message <ArrowRight size={16} />
                     </button>
                  </div>
               </div>

               <div className="card-custom" style={{ padding: '2.5rem', textAlign: 'center' }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--ink-500)', marginBottom: '1.5rem' }}>Full record available for internal audit.</p>
                  <button style={{ color: 'var(--noel-red)', background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px', margin: '0 auto' }}>
                     <ExternalLink size={16} /> Download PDF Portfolio
                  </button>
               </div>
            </aside>

         </div>
      </div>
      
      <style jsx>{`
        .back-link:hover {
           opacity: 1 !important;
           transform: translateX(-4px);
           transition: all 0.2s ease;
        }
        .card-custom {
           background-color: #fff;
           border-radius: 30px;
           box-shadow: 0 20px 40px -10px rgba(0,0,0,0.05);
           border: 1px solid var(--ink-100);
        }
      `}</style>
    </div>
  );
}

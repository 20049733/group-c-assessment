'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle,
  Sparkles,
  Lock,
  User,
  Briefcase,
  GraduationCap,
  Users,
  Check
} from 'lucide-react';

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    sector: 'Hospitality',
    workHistory: '',
    education: '',
    references: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStep(4);
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fff' }}>
      
      {/* Left Panel: Magazine Style */}
      <div style={{ 
        width: '40%', 
        backgroundColor: 'var(--noel-red)', 
        position: 'relative', 
        padding: '6rem 4rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: '#fff',
        overflow: 'hidden'
      }}>
        {/* Background Decorative Elements */}
        <div className="blob" style={{ position: 'absolute', top: '-15%', left: '-10%', width: '500px', height: '500px', backgroundColor: 'rgba(0,0,0,0.1)', filter: 'blur(60px)' }}></div>
        <div style={{ position: 'absolute', bottom: '0', right: '0', opacity: 0.15 }}>
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop" alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <Link href="/">
             <img src="/noel-logo.png" alt="Noel Group" style={{ height: '32px', filter: 'brightness(0) invert(1)', marginBottom: '5rem' }} />
          </Link>
          <h1 className="text-giant" style={{ fontSize: '5rem', lineHeight: '0.9', color: '#fff', marginBottom: '2rem' }}>
            Join the top 1%
          </h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '400px', lineHeight: '1.5' }}>
            We don't just find jobs. We architect careers. Start your journey with Ireland's premier recruitment partner.
          </p>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {['Industrial', 'Healthcare', 'Office', 'Hospitality'].map(s => (
                <span key={s} style={{ padding: '6px 16px', borderRadius: '50px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', fontSize: '0.85rem', fontWeight: 600 }}>{s}</span>
              ))}
           </div>
        </div>
      </div>

      {/* Right Panel: Clean Form Area */}
      <div style={{ width: '60%', padding: '6rem 10%', display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5rem' }}>
           <div style={{ display: 'flex', gap: '8px' }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ 
                  width: '60px', 
                  height: '4px', 
                  backgroundColor: step >= i ? 'var(--noel-red)' : 'var(--ink-100)',
                  borderRadius: '2px',
                  transition: 'background-color 0.3s'
                }}></div>
              ))}
           </div>
           <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink-400)' }}>STEP 0{step} OF 03</span>
        </div>

        <div style={{ flex: 1 }}>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="animate-up">
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Personal Identity</h2>
                <p style={{ color: 'var(--ink-500)', marginBottom: '3rem' }}>How should we address you and connect?</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div className="group">
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink-500)', marginBottom: '8px', display: 'block' }}>First Name</label>
                    <input type="text" className="form-input" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} required placeholder="Liam" />
                  </div>
                  <div className="group">
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink-500)', marginBottom: '8px', display: 'block' }}>Last Name</label>
                    <input type="text" className="form-input" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} required placeholder="O'Connor" />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink-500)', marginBottom: '8px', display: 'block' }}>Email Address</label>
                  <input type="email" className="form-input" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required placeholder="liam@example.ie" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem', marginBottom: '3.5rem' }}>
                  <div className="group">
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink-500)', marginBottom: '8px', display: 'block' }}>Create Portal Password</label>
                    <div style={{ position: 'relative' }}>
                       <Lock size={16} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-300)' }} />
                       <input type="password" className="form-input" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required placeholder="••••••••" />
                    </div>
                  </div>
                  <div className="group">
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink-500)', marginBottom: '8px', display: 'block' }}>Target Sector</label>
                    <select className="form-input" value={formData.sector} onChange={e => setFormData({...formData, sector: e.target.value})} style={{ appearance: 'none' }}>
                       <option>Industrial</option>
                       <option>Healthcare</option>
                       <option>Hospitality</option>
                       <option>Office</option>
                    </select>
                  </div>
                </div>

                <button type="button" onClick={nextStep} className="btn btn-secondary" style={{ width: '100%', padding: '1.5rem', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--ink-900)', color: '#fff' }}>
                  Continue to Experience <ArrowRight size={18} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="animate-up">
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Career & Expertise</h2>
                <p style={{ color: 'var(--ink-500)', marginBottom: '3rem' }}>Deep dive into your professional background.</p>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink-500)', marginBottom: '12px', display: 'block' }}>Academic Journey</label>
                  <textarea className="form-input" rows={4} value={formData.education} onChange={e => setFormData({...formData, education: e.target.value})} required placeholder="List your degrees and certifications..." />
                </div>

                <div style={{ marginBottom: '3.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink-500)', marginBottom: '12px', display: 'block' }}>Working History</label>
                  <textarea className="form-input" rows={6} value={formData.workHistory} onChange={e => setFormData({...formData, workHistory: e.target.value})} required placeholder="List your key roles and responsibilities..." />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="button" onClick={prevStep} className="btn btn-ghost" style={{ flex: 1 }}>Back</button>
                  <button type="button" onClick={nextStep} className="btn btn-secondary" style={{ flex: 2, padding: '1.5rem', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--ink-900)', color: '#fff' }}>
                    Save & Proceed <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-up">
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Final Details</h2>
                <p style={{ color: 'var(--ink-500)', marginBottom: '3rem' }}>Almost there. Add your references and phone number.</p>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink-500)', marginBottom: '8px', display: 'block' }}>Phone Number</label>
                  <input type="tel" className="form-input" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required placeholder="+353 87 123 4567" />
                </div>

                <div style={{ marginBottom: '3.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink-500)', marginBottom: '12px', display: 'block' }}>Referee Contact Info</label>
                  <textarea className="form-input" rows={6} value={formData.references} onChange={e => setFormData({...formData, references: e.target.value})} required placeholder="Names, titles, and emails of your referees..." />
                </div>

                <div style={{ padding: '1.5rem', backgroundColor: 'var(--accent-mint)', borderRadius: 'var(--radius-md)', marginBottom: '2.5rem' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--ink-800)', lineHeight: '1.5' }}>
                    <b>Privacy Note:</b> By submitting, you agree to Noel Group's data protection policy. Your data will be stored securely in our local SQLite environment.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="button" onClick={prevStep} className="btn btn-ghost" style={{ flex: 1 }}>Back</button>
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ flex: 2, padding: '1.5rem', borderRadius: 'var(--radius-full)' }}>
                    {isSubmitting ? 'Architecting Profile...' : 'Complete Application'} <CheckCircle size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-up" style={{ textAlign: 'center', padding: '4rem 0' }}>
                 <div style={{ 
                   width: '100px', 
                   height: '100px', 
                   backgroundColor: 'var(--accent-mint)', 
                   borderRadius: '50%', 
                   display: 'flex', 
                   alignItems: 'center', 
                   justifyContent: 'center', 
                   margin: '0 auto 3rem',
                   boxShadow: '0 20px 40px -10px rgba(16, 185, 129, 0.3)'
                 }}>
                   <Check size={48} color="var(--ink-900)" />
                 </div>
                 <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>You're Live.</h2>
                 <p style={{ color: 'var(--ink-500)', fontSize: '1.25rem', marginBottom: '4rem', maxWidth: '400px', margin: '0 auto 4rem' }}>
                    Your application is being reviewed by our specialist agents. You can now use your email to check your status.
                 </p>
                 <div style={{ display: 'grid', gap: '1rem', maxWidth: '300px', margin: '0 auto' }}>
                    <Link href="/candidate-login" className="btn btn-primary" style={{ padding: '1.25rem', borderRadius: 'var(--radius-full)' }}>
                       Go to Status Portal
                    </Link>
                    <Link href="/" style={{ color: 'var(--ink-400)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>
                       Back to Homepage
                    </Link>
                 </div>
              </div>
            )}
          </form>
        </div>
      </div>

      <style jsx>{`
        .form-input {
          width: 100%;
          padding: 1.25rem;
          background-color: var(--ink-50);
          border: 1px solid var(--ink-100);
          border-radius: 12px;
          font-family: inherit;
          font-size: 1rem;
          transition: all 0.2s;
        }
        .form-input:focus {
          outline: none;
          background-color: #fff;
          border-color: var(--noel-red);
          box-shadow: 0 0 0 4px rgba(237, 28, 36, 0.05);
        }
        .text-giant {
          letter-spacing: -0.04em;
        }
      `}</style>
    </div>
  );
}

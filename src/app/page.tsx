'use client';

import Link from 'next/link';
import { 
  ArrowRight,
  ChevronRight, 
  ChevronLeft,
  Briefcase, 
  Users, 
  Star, 
  CheckCircle, 
  ArrowUpRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  Quote
} from 'lucide-react';

export default function Home() {
  const sectors = [
    { name: 'Hospitality', color: 'var(--accent-mint)', stat: '40%', desc: 'Cost saving when hiring with Noel.', icon: <Briefcase /> },
    { name: 'Healthcare', color: 'var(--accent-pink)', stat: '>3', desc: 'Average interviews to hire.', icon: <Users /> },
    { name: 'Construction', color: 'var(--accent-purple)', stat: '1 Week', desc: 'Average time to hire.', icon: <TrendingUp /> },
    { name: 'Industrial', color: 'var(--accent-yellow)', stat: '$80,000', desc: 'Cost savings across HR & Legal.', icon: <ShieldCheck /> },
  ];

  return (
    <main style={{ backgroundColor: '#fff' }}>
      {/* Hero Section - Uploop Style */}
      <section style={{ padding: '12rem 0 8rem', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div className="animate-up">
            <h1 className="text-giant" style={{ marginBottom: '2.5rem' }}>
              Recruit the Top <br />
              <span style={{ color: 'var(--noel-red)' }}>1% of Talent</span>, <br />
              Quickly
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--ink-500)', marginBottom: '3.5rem', maxWidth: '540px' }}>
              Nearly 30 years providing specialized resources to Ireland's leading employers and world-class events. Build real relationships with real people.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link href="/candidate-registration" className="btn btn-primary" style={{ padding: '1.25rem 2.5rem', fontSize: '1.1rem', borderRadius: 'var(--radius-full)' }}>
                Apply as a Candidate
              </Link>
              <Link href="#" className="btn btn-ghost" style={{ padding: '1.25rem 2.5rem', fontSize: '1.1rem', border: '1px solid var(--ink-200)', borderRadius: 'var(--radius-full)' }}>
                Hire Talent
              </Link>
            </div>
          </div>

          {/* Right Visuals - Image + Blob + Floating Card */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Organic Blob Background */}
            <div className="blob" style={{ 
              position: 'absolute', 
              width: '120%', 
              height: '120%', 
              backgroundColor: 'var(--accent-pink)', 
              zIndex: 0,
              opacity: 0.6
            }}></div>
            
            {/* Main Image */}
            <div style={{ 
              position: 'relative', 
              zIndex: 1, 
              width: '440px', 
              height: '560px', 
              backgroundColor: '#eee', 
              borderRadius: 'var(--radius-xl)', 
              backgroundImage: 'url("https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: 'var(--shadow-premium)'
            }}></div>

            {/* Floating Profile Card */}
            <div className="glass animate-up" style={{ 
              position: 'absolute', 
              bottom: '40px', 
              left: '-20px', 
              zIndex: 2, 
              padding: '1.5rem', 
              borderRadius: 'var(--radius-lg)', 
              boxShadow: 'var(--shadow-xl)',
              width: '280px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--noel-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800 }}>NG</div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>Sarah O'Reilly</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--ink-500)' }}>Industrial Specialist</p>
                </div>
              </div>
              <div style={{ display: 'grid', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--ink-600)' }}>
                  <CheckCircle size={14} color="var(--noel-red)" /> Verified Skills
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--ink-600)' }}>
                  <CheckCircle size={14} color="var(--noel-red)" /> Open to Roles
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '-12px', marginBottom: '2rem' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '50%', 
                backgroundColor: '#eee', 
                border: '4px solid #fff',
                marginLeft: i > 1 ? '-12px' : 0,
                backgroundImage: `url("https://i.pravatar.cc/150?u=${i+10}")`,
                backgroundSize: 'cover'
              }}></div>
            ))}
          </div>
          <h2 style={{ fontSize: '2.5rem', maxWidth: '800px', margin: '0 auto 2rem', lineHeight: '1.3' }}>
            "Noel Group helped us quickly connect with top talent, allowing us to fill critical skill gaps and keep our projects on track."
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <img src="/noel-logo.png" alt="Client Logo" style={{ height: '24px' }} />
          </div>
        </div>
      </section>

      {/* Stats / Sectors Grid - Uploop Style */}
      <section style={{ padding: '8rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 className="text-giant" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Tech hiring <br /> made simple.</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
               <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 18C15 2 45 2 58 18" stroke="var(--noel-red)" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {sectors.map((sector) => (
              <div key={sector.name} className="accent-card" style={{ backgroundColor: sector.color }}>
                <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{sector.stat}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-700)', fontWeight: 500, lineHeight: '1.4' }}>{sector.desc}</p>
                <div style={{ marginTop: '3rem', opacity: 0.1 }}>
                  {sector.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Matching Section - Alternating Layout */}
      <section style={{ padding: '8rem 0', backgroundColor: 'var(--ink-50)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
             <div className="blob" style={{ 
              position: 'absolute', 
              top: '-20%', 
              right: '-20%',
              width: '100%', 
              height: '100%', 
              backgroundColor: 'var(--accent-yellow)', 
              zIndex: 0,
              opacity: 0.5
            }}></div>
            <div style={{ position: 'relative', zIndex: 1, backgroundColor: '#fff', padding: '2rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-premium)' }}>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'var(--ink-50)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#fff' }}></div>
                      <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Candidate {i}</span>
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--noel-red)' }}>$50/hr</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '2rem', lineHeight: '1.1' }}>Matching That <br /> Delivers Results</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--ink-500)', marginBottom: '2.5rem' }}>
              Behind the scenes, our AI-powered platform and hiring experts curate a list of top candidates tailored to your technical needs. We do the hard work so you can focus on building your team.
            </p>
            <Link href="#" className="btn btn-secondary">Hire Talent</Link>
          </div>
        </div>
      </section>

      {/* Feature 2: Profiles Built for Confidence */}
       <section style={{ padding: '8rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '2rem', lineHeight: '1.1' }}>Profiles Built for <br /> Confidence</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--ink-500)', marginBottom: '2.5rem' }}>
              Access detailed profiles for each handpicked candidate, complete with work history, technical skills, assessments, and cultural fit insights. All the information you need to make smarter decisions is in one place.
            </p>
            <Link href="/candidate-registration" className="btn btn-primary">Join as Candidate</Link>
          </div>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
             <div className="blob" style={{ 
              position: 'absolute', 
              bottom: '-20%', 
              left: '-20%',
              width: '100%', 
              height: '100%', 
              backgroundColor: 'var(--accent-mint)', 
              zIndex: 0,
              opacity: 0.6
            }}></div>
            <div className="card" style={{ zIndex: 1, width: '320px', padding: '2rem' }}>
               <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#eee', margin: '0 auto 1rem' }}></div>
                <h4 style={{ fontSize: '1.1rem' }}>Hussein Akbar</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--ink-500)' }}>Frontend Developer</p>
               </div>
               <button className="btn btn-secondary" style={{ width: '100%' }}>Hire Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials: Costumer Love Stories - High Fidelity Uploop Style */}
      <section style={{ padding: '10rem 0', backgroundColor: '#fff', overflow: 'hidden' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '6rem', position: 'relative' }}>
            <h2 className="text-giant" style={{ fontSize: '4.5rem', color: 'var(--ink-900)' }}>
              Costumer love stories
            </h2>
            <div style={{ position: 'absolute', right: '35%', top: '-30px', opacity: 0.15 }}>
               <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18" stroke="var(--noel-red)" strokeWidth="4" strokeDasharray="10 10" />
               </svg>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1fr) 1.2fr', gap: '8rem', alignItems: 'center' }}>
            <div>
              <div style={{ marginBottom: '3rem' }}>
                <img src="/noel-logo.png" alt="Noel Group" style={{ height: '24px', opacity: 0.8 }} />
              </div>
              <p style={{ fontSize: '1.75rem', lineHeight: '1.4', marginBottom: '3.5rem', color: 'var(--ink-800)', fontWeight: 500 }}>
                 "We wish we knew about Noel Group at the beginning of our recruiting process. We spent months looking for the right talent. Once we came across them, we had solid leads within a week and finalized our first hire shortly after."
              </p>
              <div style={{ marginBottom: '4rem' }}>
                <p style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--ink-900)' }}>Alex O'Shea</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-500)', fontWeight: 600 }}>Creative Director at AdVent Ireland</p>
              </div>
              
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ink-400)', cursor: 'pointer', transition: 'color 0.3s' }}>
                    <ChevronLeft size={20} /> <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Previous</span>
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ink-900)', cursor: 'pointer', transition: 'color 0.3s' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Next</span> <ArrowRight size={20} />
                 </div>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ 
                width: '100%', 
                height: '640px', 
                borderRadius: '3rem', 
                backgroundColor: 'var(--accent-mint)',
                backgroundImage: 'url("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: 'var(--shadow-premium)'
              }}>
                {/* Overlay Shape - The Curly Green thing from Uploop */}
                <div style={{ 
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  width: '240px',
                  height: '240px',
                  zIndex: 2,
                  backgroundImage: 'url("https://raw.githubusercontent.com/pmndrs/drei-assets/master/clay_organic.png")', // Placeholder curly shape
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  opacity: 0.9
                }}></div>
              </div>

              {/* Overlapping Badge */}
              <div style={{ 
                position: 'absolute', 
                bottom: '-40px', 
                right: '40px', 
                width: '120px', 
                height: '120px', 
                backgroundColor: 'var(--accent-mint)', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--ink-900)',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
                zIndex: 3
              }}>
                <ArrowUpRight size={48} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

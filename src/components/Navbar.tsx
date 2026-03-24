'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAgent, setIsAgent] = useState(false);
  const [isCandidate, setIsCandidate] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Check auth status
    const checkAuth = () => {
      setIsAgent(!!localStorage.getItem('agentId'));
      setIsCandidate(!!localStorage.getItem('candidateId'));
    };
    
    checkAuth();
    // Re-check on local storage changes (if any) or navigation
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkAuth);
    };
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('agentId');
    localStorage.removeItem('candidateId');
    setIsAgent(false);
    setIsCandidate(false);
    router.push('/');
    router.refresh();
  };

  return (
    <nav 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000, 
        padding: isScrolled ? '1rem 0' : '1.5rem 0',
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--ink-100)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img 
            src="/noel-logo.png" 
            alt="Noel Group" 
            style={{ height: isScrolled ? '24px' : '28px', transition: 'height 0.3s' }} 
          />
        </Link>

        {/* Desktop Links */}
        <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          <Link href="/" className="nav-link" style={{ fontSize: '0.85rem', fontWeight: 700 }}>Home</Link>
          
          {isAgent ? (
             <Link href="/dashboard" className="nav-link" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--noel-red)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <LayoutDashboard size={16} /> Agent Portal
             </Link>
          ) : isCandidate ? (
             <Link href="/candidate-dashboard" className="nav-link" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--noel-red)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={16} /> My Application
             </Link>
          ) : (
             <>
               <Link href="/candidate-login" className="nav-link" style={{ fontSize: '0.85rem', fontWeight: 700 }}>Check Status</Link>
               <Link href="/login" className="nav-link" style={{ fontSize: '0.85rem', fontWeight: 700 }}>Agent Login</Link>
             </>
          )}

          {isAgent || isCandidate ? (
            <button 
              onClick={handleLogout}
              className="btn btn-secondary" 
              style={{ 
                padding: '0.6rem 1.5rem', 
                borderRadius: '50px', 
                backgroundColor: 'var(--ink-50)', 
                color: 'var(--ink-900)', 
                fontSize: '0.85rem',
                border: '1px solid var(--ink-200)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Sign Out <LogOut size={16} />
            </button>
          ) : (
            <Link 
              href="/candidate-registration" 
              className="btn btn-secondary" 
              style={{ padding: '0.75rem 2rem', borderRadius: '50px', backgroundColor: 'var(--ink-900)', color: '#fff', fontSize: '0.85rem' }}
            >
              Get Started
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer', zIndex: 1001 }}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100vh', 
          backgroundColor: '#fff', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '2rem',
          transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 999
        }}
      >
          <Link href="/" onClick={() => setIsOpen(false)} style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--ink-900)' }}>Home</Link>
          
          {isAgent ? (
            <Link href="/dashboard" onClick={() => setIsOpen(false)} style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--noel-red)' }}>Agent Portal</Link>
          ) : isCandidate ? (
            <Link href="/candidate-dashboard" onClick={() => setIsOpen(false)} style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--noel-red)' }}>My Application</Link>
          ) : (
            <>
              <Link href="/candidate-login" onClick={() => setIsOpen(false)} style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--ink-900)' }}>Check Status</Link>
              <Link href="/login" onClick={() => setIsOpen(false)} style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--ink-900)' }}>Agent Login</Link>
            </>
          )}

          {isAgent || isCandidate ? (
             <button onClick={handleLogout} style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--noel-red)', border: 'none', background: 'none', cursor: 'pointer' }}>Logout</button>
          ) : (
            <Link href="/candidate-registration" onClick={() => setIsOpen(false)} className="btn btn-primary" style={{ padding: '1.5rem 3rem', borderRadius: '50px', fontSize: '1.25rem' }}>
              Register Now
            </Link>
          )}
      </div>

      <style jsx>{`
        .nav-link {
          color: var(--ink-600);
          text-decoration: none;
          transition: color 0.3s;
        }
        .nav-link:hover {
          color: var(--noel-red);
        }
        @media (min-width: 769px) {
          .mobile-toggle { display: none; }
        }
        @media (max-width: 768px) {
          .desktop-menu { display: none; }
        }
      `}</style>
    </nav>
  );
}

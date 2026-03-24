'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--ink-900)', color: '#fff', padding: '6rem 0' }}>
      <div className="container">
        <div className="footer-grid" style={{ marginBottom: '4rem' }}>
          <div>
            <img 
              src="/noel-logo.png" 
              alt="Noel Group" 
              style={{ height: '32px', filter: 'brightness(0) invert(1)', marginBottom: '1.5rem' }} 
            />
            <p style={{ color: '#888', fontSize: '0.95rem', lineHeight: '1.6', maxWidth: '280px' }}>
              Building real relationships with real people across Ireland for nearly 30 years.
            </p>
          </div>
          
          <div>
            <h4 style={{ color: '#fff', marginBottom: '1.5rem', fontSize: '1rem' }}>Sectors</h4>
            <div style={{ display: 'grid', gap: '10px' }}>
              <Link href="#" className="footer-link">Hospitality</Link>
              <Link href="#" className="footer-link">Healthcare</Link>
              <Link href="#" className="footer-link">Construction</Link>
              <Link href="#" className="footer-link">Industrial</Link>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#fff', marginBottom: '1.5rem', fontSize: '1rem' }}>Candidates</h4>
            <div style={{ display: 'grid', gap: '10px' }}>
              <Link href="/candidate-registration" className="footer-link">Register Now</Link>
              <Link href="#" className="footer-link">Job Search</Link>
              <Link href="#" className="footer-link">Career Advice</Link>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#fff', marginBottom: '1.5rem', fontSize: '1rem' }}>Contact</h4>
            <div style={{ display: 'grid', gap: '10px', color: '#888', fontSize: '0.95rem' }}>
              <p>+353 (0) 1 677 9332</p>
              <p>info@noelgroup.ie</p>
              <p>Dublin, Ireland</p>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: '#555', fontSize: '0.85rem' }}>
            © 2026 Noel Group Ireland. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link href="#" className="footer-link" style={{ fontSize: '0.85rem' }}>Privacy Policy</Link>
            <Link href="#" className="footer-link" style={{ fontSize: '0.85rem' }}>Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

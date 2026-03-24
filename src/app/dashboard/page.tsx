'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  FileText,
  LogOut,
  LayoutDashboard,
  Users as UsersIcon,
  Settings,
  MoreHorizontal,
  Plus,
  Filter,
  Loader2,
  Calendar,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AgentDashboard() {
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const router = useRouter();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/applications');
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Failed to fetch:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'APPROVED': return { color: '#10b981', bg: '#ecfdf5', dot: '#10b981' };
      case 'REJECTED': return { color: '#ef4444', bg: '#fef2f2', dot: '#ef4444' };
      default: return { color: '#f59e0b', bg: '#fffbeb', dot: '#f59e0b' };
    }
  };

  const filteredApps = applications.filter(app => {
    if (activeTab === 'applications') return app.status === 'PENDING';
    if (activeTab === 'candidates') return app.status === 'APPROVED';
    if (statusFilter === 'ALL') return true;
    return app.status === statusFilter;
  });

  if (isLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', backgroundColor: '#fff' }}>
        <Loader2 className="animate-spin" size={32} color="var(--noel-red)" />
        <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Loading Agent Portal...</span>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', display: 'flex' }}>
      
      {/* Sidebar - Fixed */}
      <div style={{ 
        width: '280px', 
        backgroundColor: 'var(--ink-50)', 
        padding: '3rem 1.5rem', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        borderRight: '1px solid var(--ink-100)',
        zIndex: 10
      }}>
        <div style={{ marginBottom: '4rem', padding: '0 0.5rem' }}>
          <img src="/noel-logo.png" alt="Noel Group" style={{ height: '28px' }} />
        </div>
        
        <nav style={{ flex: 1 }}>
          <div style={{ display: 'grid', gap: '4px' }}>
            <button 
              onClick={() => {setActiveTab('dashboard'); setStatusFilter('ALL');}} 
              className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            >
              <LayoutDashboard size={20} /> Dashboard
            </button>
            <button 
              onClick={() => {setActiveTab('applications'); setStatusFilter('PENDING');}}
              className={`nav-btn ${activeTab === 'applications' ? 'active' : ''}`}
            >
              <FileText size={20} /> Applications
            </button>
            <button 
              onClick={() => setActiveTab('candidates')}
              className={`nav-btn ${activeTab === 'candidates' ? 'active' : ''}`}
            >
              <UsersIcon size={20} /> Talent Pool
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
            >
              <Settings size={20} /> System Config
            </button>
          </div>
        </nav>

        <div style={{ paddingTop: '2rem', borderTop: '1px solid var(--ink-100)' }}>
          <div onClick={() => router.push('/')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', cursor: 'pointer', borderRadius: '12px' }} className="row-hover">
            <div style={{ width: '44px', height: '44px', borderRadius: '14px', backgroundColor: 'var(--noel-red)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem' }}>NA</div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <p style={{ fontSize: '0.95rem', fontWeight: 700 }}>Noel Agent</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--ink-500)' }}>Sign Out</p>
            </div>
            <LogOut size={18} color="var(--ink-400)" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: '280px', padding: '4rem 5rem' }}>
        
        {activeTab === 'dashboard' || activeTab === 'applications' ? (
          <>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
              <div>
                <h1 className="text-giant" style={{ fontSize: '3.5rem', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                  {activeTab === 'dashboard' ? 'Overview' : 'Applications'}
                </h1>
                <p style={{ color: 'var(--ink-500)', fontSize: '1.1rem' }}>
                   Manage your recruitment pipeline for the <span style={{ color: 'var(--noel-red)', fontWeight: 700 }}>Technical Sector</span>.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                 <div style={{ position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-400)' }} />
                    <input type="text" placeholder="Search candidates..." style={{ padding: '0.85rem 1rem 0.85rem 3rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--ink-100)', width: '300px', fontSize: '0.9rem' }} />
                 </div>
              </div>
            </header>

            {/* Stat Cards - Interactive Filters */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
               {[
                 { label: 'Total Apps', count: applications.length, filter: 'ALL', color: 'var(--ink-50)' },
                 { label: 'Pending', count: applications.filter(a => a.status === 'PENDING').length, filter: 'PENDING', color: 'var(--accent-pink)' },
                 { label: 'Approved', count: applications.filter(a => a.status === 'APPROVED').length, filter: 'APPROVED', color: 'var(--accent-mint)' },
                 { label: 'Rejected', count: applications.filter(a => a.status === 'REJECTED').length, filter: 'REJECTED', color: 'var(--accent-yellow)' }
               ].map(stat => (
                 <div 
                   key={stat.label}
                   onClick={() => setStatusFilter(stat.filter)}
                   className="accent-card" 
                   style={{ 
                     backgroundColor: stat.color, 
                     padding: '2rem', 
                     cursor: 'pointer',
                     border: statusFilter === stat.filter ? '2px solid var(--ink-900)' : '2px solid transparent',
                     transform: statusFilter === stat.filter ? 'translateY(-4px)' : 'none',
                     transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                   }}
                 >
                    <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ink-600)', marginBottom: '0.5rem' }}>{stat.label}</p>
                    <h3 style={{ fontSize: '3rem', fontWeight: 800 }}>{stat.count}</h3>
                 </div>
               ))}
            </div>

            {/* List Section - FULL WIDTH NOW */}
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0 1rem' }}>
                 <p style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--ink-400)', textTransform: 'uppercase' }}>Showing {filteredApps.length} Results</p>
                 <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--ink-400)' }}>Sort by:</span>
                    <span style={{ fontWeight: 700, cursor: 'pointer' }}>Date Added ▾</span>
                 </div>
              </div>

              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {filteredApps.map(app => (
                  <div 
                    key={app.id} 
                    onClick={() => router.push(`/dashboard/candidates/${app.id}`)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      padding: '1.5rem 2.5rem', 
                      backgroundColor: '#fff',
                      border: '1px solid var(--ink-100)',
                      borderRadius: '24px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                    }}
                    className="app-row"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                       <div style={{ 
                         width: '56px', 
                         height: '56px', 
                         borderRadius: '18px', 
                         backgroundColor: 'var(--ink-900)', 
                         color: '#fff', 
                         display: 'flex', 
                         alignItems: 'center', 
                         justifyContent: 'center', 
                         fontWeight: 800,
                         fontSize: '1.25rem'
                       }}>
                          {app.first_name.charAt(0)}
                       </div>
                       <div>
                          <p style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--ink-900)' }}>{app.first_name} {app.last_name}</p>
                          <p style={{ fontSize: '0.9rem', color: 'var(--ink-500)', fontWeight: 500 }}>{app.sector || 'General Recruitment'} • Submitted {new Date(app.created_at).toLocaleDateString()}</p>
                       </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                       <div style={{ 
                         display: 'inline-flex', 
                         alignItems: 'center', 
                         gap: '8px', 
                         padding: '8px 20px', 
                         borderRadius: 'var(--radius-full)', 
                         fontSize: '0.85rem', 
                         fontWeight: 800, 
                         color: getStatusStyle(app.status).color, 
                         backgroundColor: getStatusStyle(app.status).bg 
                       }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getStatusStyle(app.status).dot }}></div>
                          {app.status}
                       </div>
                       <button className="btn btn-ghost" style={{ padding: '8px 20px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700 }}>
                          View Profile <ChevronRight size={18} />
                       </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredApps.length === 0 && (
                <div style={{ textAlign: 'center', padding: '8rem', border: '2px dashed var(--ink-100)', borderRadius: '40px', backgroundColor: 'var(--ink-50)' }}>
                   <FileText size={56} color="var(--ink-200)" style={{ marginBottom: '2rem' }} />
                   <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>No {statusFilter.toLowerCase()} applications</h3>
                   <p style={{ color: 'var(--ink-400)' }}>Try changing your filter or check back later.</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '10rem 0' }}>
             <h2 style={{ fontSize: '3rem', color: 'var(--ink-200)' }}>Section coming soon.</h2>
             <p style={{ color: 'var(--ink-400)' }}>We are currently building the {activeTab} module.</p>
             <button onClick={() => setActiveTab('dashboard')} className="btn btn-secondary" style={{ marginTop: '2rem', borderRadius: '50px' }}>Back to Dashboard</button>
          </div>
        )}
      </div>

      <style jsx>{`
        .nav-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          border: none;
          background: transparent;
          color: var(--ink-500);
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          border-radius: 14px;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: left;
        }
        .nav-btn:hover { background-color: rgba(0,0,0,0.03); color: var(--ink-900); }
        .nav-btn.active { background-color: #fff; color: var(--noel-red); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        
        .app-row:hover {
           border-color: var(--ink-900) !important;
           transform: translateY(-2px);
           box-shadow: 0 10px 30px -10px rgba(0,0,0,0.08) !important;
        }
      `}</style>
    </div>
  );
}

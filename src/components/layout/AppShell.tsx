'use client';

import { useState, useEffect } from 'react';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Close drawer on larger screens
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setSidebarOpen(false);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div className="app-shell">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <AppSidebar
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
      />

      {/* Main area */}
      <div
        className="main-area"
        style={{
          marginLeft: `var(${sidebarCollapsed ? '--sidebar-collapsed-w' : '--sidebar-w'})`,
        }}
      >
        <AppHeader
          onMenuClick={() => setSidebarOpen(true)}
          isSidebarCollapsed={sidebarCollapsed}
        />
        <main className="main-content">{children}</main>
      </div>

      <style>{`
        .app-shell {
          display: flex;
          min-height: 100vh;
          background: var(--bg-base);
        }

        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgb(0 0 0 / 0.4);
          z-index: 40;
          backdrop-filter: blur(2px);
        }

        .main-area {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          transition: margin-left 0.2s ease;
        }

        .main-content {
          flex: 1;
          padding: 24px;
          max-width: 1100px;
          width: 100%;
          margin: 0 auto;
        }

        @media (max-width: 1023px) {
          .main-area {
            margin-left: 0 !important;
          }
          .main-content {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
}

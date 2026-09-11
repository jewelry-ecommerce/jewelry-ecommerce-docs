'use client';

import { useState, useCallback, useEffect } from 'react';
import { Menu, Search, Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { GlobalSearch } from '@/components/search/GlobalSearch';

interface AppHeaderProps {
  onMenuClick: () => void;
  isSidebarCollapsed: boolean;
}

export function AppHeader({ onMenuClick }: AppHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const cycleTheme = useCallback(() => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  }, [theme, setTheme]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const ThemeIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;

  return (
    <>
      <header className="app-header">
        {/* Left: mobile menu + logo mobile */}
        <div className="header-left">
          <button
            className="header-btn mobile-menu-btn"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>

        {/* Center: Search trigger */}
        <button
          className="search-trigger"
          onClick={() => setSearchOpen(true)}
          aria-label="Search documentation"
        >
          <Search size={14} />
          <span className="search-trigger-text">Tìm kiếm...</span>
          <kbd className="search-kbd">⌘K</kbd>
        </button>

        {/* Right: theme toggle */}
        <div className="header-right">
          <button
            className="header-btn"
            onClick={cycleTheme}
            aria-label={mounted ? `Current theme: ${theme}. Click to change.` : 'Toggle theme'}
            title="Toggle theme"
            suppressHydrationWarning
          >
            {mounted ? <ThemeIcon size={16} /> : <Monitor size={16} />}
          </button>
        </div>
      </header>

      {/* Global Search Modal */}
      {searchOpen && <GlobalSearch onClose={() => setSearchOpen(false)} />}

      <style>{`
        .app-header {
          position: sticky;
          top: 0;
          z-index: 30;
          height: 56px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 24px;
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border);
          backdrop-filter: blur(8px);
        }

        .header-left { display: flex; align-items: center; gap: 8px; }
        .header-right { display: flex; align-items: center; gap: 4px; }

        .header-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border: none;
          background: transparent;
          cursor: pointer;
          color: var(--text-secondary);
          border-radius: var(--radius-md);
          transition: background 0.1s, color 0.1s;
        }

        .header-btn:hover {
          background: var(--bg-subtle);
          color: var(--text-primary);
        }

        .mobile-menu-btn { display: none; }

        .search-trigger {
          flex: 1;
          max-width: 480px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          cursor: text;
          color: var(--text-muted);
          font-size: 0.875rem;
          transition: border-color 0.15s, background 0.15s;
        }

        .search-trigger:hover {
          border-color: var(--border-strong);
          background: var(--bg-muted);
        }

        .search-trigger-text {
          flex: 1;
          text-align: left;
        }

        .search-kbd {
          display: inline-flex;
          align-items: center;
          padding: 2px 5px;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 4px;
          font-size: 0.7rem;
          font-family: inherit;
          color: var(--text-muted);
        }

        @media (max-width: 1023px) {
          .mobile-menu-btn { display: flex; }
          .search-kbd { display: none; }
        }

        @media (max-width: 640px) {
          .app-header { padding: 0 16px; }
        }
      `}</style>
    </>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  List,
  Layers,
  GitFork,
  BookOpen,
  FileText,
  Map,
  ChevronLeft,
  X,
  Gem,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { epics } from '@/content/epics';
import { getStoriesByEpic } from '@/content/stories';
import { getEpicIcon } from '@/lib/utils';

const PRIORITY_DOT: Record<string, string> = {
  MUST: 'dot-must',
  SHOULD: 'dot-should',
  NICE: 'dot-nice',
};

interface TopNavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const TOP_NAV: TopNavItem[] = [
  { label: 'Overview', href: '/', icon: LayoutDashboard },
  { label: 'Backlog', href: '/backlog', icon: List },
];

const BOTTOM_NAV: TopNavItem[] = [
  { label: 'E2E Flows', href: '/flows', icon: GitFork },
  { label: 'Global Rules', href: '/rules', icon: BookOpen },
  { label: 'Decision Log', href: '/decisions', icon: FileText },
  { label: 'Roadmap', href: '/roadmap', icon: Map },
];

interface AppSidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
}

export function AppSidebar({ isOpen, isCollapsed, onClose, onToggleCollapse }: AppSidebarProps) {
  const pathname = usePathname();
  const [expandedEpics, setExpandedEpics] = useState<Set<string>>(() => {
    // Auto-expand the epic that matches current URL
    const set = new Set<string>();
    const match = pathname.match(/\/epics\/(ep-\d+)/);
    if (match) set.add(match[1]!.toUpperCase().replace('-0', '-'));
    return set;
  });

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const toggleEpic = (epicId: string) => {
    setExpandedEpics((prev) => {
      const next = new Set(prev);
      if (next.has(epicId)) next.delete(epicId);
      else next.add(epicId);
      return next;
    });
  };

  const epicUrlId = (id: string) => id.toLowerCase();

  return (
    <>
      <aside
        className={cn('sidebar', isOpen && 'sidebar-open', isCollapsed && 'sidebar-collapsed')}
        aria-label="Main navigation"
      >
        {/* ── Logo ─────────────────────────────────────────── */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <Gem size={16} />
          </div>
          {!isCollapsed && (
            <div className="sidebar-logo-text">
              <span className="sidebar-logo-title">Jewelry Commerce</span>
              <span className="sidebar-logo-sub">Graduation Docs</span>
            </div>
          )}
          <button className="sidebar-close-btn lg-hidden" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        {/* ── Nav ──────────────────────────────────────────── */}
        <nav className="sidebar-nav" aria-label="Sidebar navigation">
          {/* Top items */}
          {TOP_NAV.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn('sidebar-item', isActive(item.href) && 'sidebar-item-active')}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon size={15} className="sidebar-item-icon" />
                {!isCollapsed && <span className="sidebar-item-label">{item.label}</span>}
              </Link>
            );
          })}

          {/* ── Epics group ──────────────────────────────────── */}
          {!isCollapsed && (
            <div className="sidebar-group-label">
              <Layers size={11} />
              Epics
            </div>
          )}

          {epics.map((epic) => {
            const epicUrl = `/epics/${epicUrlId(epic.id)}`;
            const isEpicActive = pathname.startsWith(epicUrl);
            const isExpanded = expandedEpics.has(epic.id);
            const stories = getStoriesByEpic(epic.id);
            const icon = getEpicIcon(epic.id);

            return (
              <div key={epic.id}>
                {/* Epic row */}
                <div className={cn('sidebar-epic-row', isEpicActive && 'sidebar-item-active')}>
                  {/* Click icon/title area → navigate */}
                  <Link
                    href={epicUrl}
                    className="sidebar-epic-link"
                    title={isCollapsed ? `${epic.id} ${epic.title}` : undefined}
                  >
                    <span className="sidebar-epic-icon">{icon}</span>
                    {!isCollapsed && (
                      <>
                        <span className="sidebar-epic-id">{epic.id}</span>
                        <span className="sidebar-epic-title">{epic.title}</span>
                      </>
                    )}
                  </Link>

                  {/* Toggle button */}
                  {!isCollapsed && (
                    <button
                      className="sidebar-epic-toggle"
                      onClick={() => toggleEpic(epic.id)}
                      aria-label={isExpanded ? `Collapse ${epic.id}` : `Expand ${epic.id}`}
                    >
                      {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                    </button>
                  )}
                </div>

                {/* User Stories under epic */}
                {!isCollapsed && isExpanded && (
                  <div className="sidebar-stories">
                    {stories.length === 0 && (
                      <span className="sidebar-story-empty">No stories</span>
                    )}
                    {stories.map((story) => {
                      const storyHref = `${epicUrl}#${story.id.toLowerCase()}`;
                      const isStoryActive = pathname === epicUrl && false; // anchor nav only
                      return (
                        <Link
                          key={story.id}
                          href={storyHref}
                          className={cn('sidebar-story-item', isStoryActive && 'sidebar-story-active')}
                          title={story.title}
                        >
                          <span className={cn('sidebar-story-dot', PRIORITY_DOT[story.priority])} />
                          <span className="sidebar-story-id">{story.id}</span>
                          <span className="sidebar-story-title">{story.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Divider */}
          <div className="sidebar-divider" />

          {/* Bottom items */}
          {BOTTOM_NAV.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn('sidebar-item', isActive(item.href) && 'sidebar-item-active')}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon size={15} className="sidebar-item-icon" />
                {!isCollapsed && <span className="sidebar-item-label">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* ── Collapse toggle (desktop) ─────────────────────── */}
        <button
          className="sidebar-collapse-btn"
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft
            size={13}
            style={{ transform: isCollapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
          />
          {!isCollapsed && <span>Thu gọn</span>}
        </button>
      </aside>

      <style>{`
        /* ─── Base sidebar ──────────────────────────────────── */
        .sidebar {
          position: fixed;
          top: 0; left: 0; bottom: 0;
          width: var(--sidebar-w);
          background: var(--bg-surface);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          z-index: 50;
          overflow: hidden;
          transition: width 0.2s ease, transform 0.2s ease;
        }
        .sidebar-collapsed { width: var(--sidebar-collapsed-w); }

        /* ─── Logo ──────────────────────────────────────────── */
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 12px;
          border-bottom: 1px solid var(--border);
          min-height: 57px;
          flex-shrink: 0;
        }
        .sidebar-logo-icon {
          width: 30px; height: 30px;
          background: linear-gradient(135deg, var(--gold-500), var(--gold-700));
          border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          color: white; flex-shrink: 0;
        }
        .sidebar-logo-text { display: flex; flex-direction: column; overflow: hidden; flex: 1; }
        .sidebar-logo-title { font-size: 0.78rem; font-weight: 700; color: var(--text-primary); white-space: nowrap; }
        .sidebar-logo-sub { font-size: 0.68rem; color: var(--text-muted); }
        .sidebar-close-btn {
          margin-left: auto; padding: 4px; border: none; background: transparent;
          cursor: pointer; color: var(--text-muted); border-radius: var(--radius-sm);
        }

        /* ─── Nav container ─────────────────────────────────── */
        .sidebar-nav {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 6px 6px;
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .sidebar-nav::-webkit-scrollbar { width: 3px; }
        .sidebar-nav::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

        /* ─── Generic nav item ──────────────────────────────── */
        .sidebar-item {
          display: flex; align-items: center; gap: 8px;
          padding: 7px 10px;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: 0.8rem; font-weight: 500;
          text-decoration: none;
          transition: background 0.1s, color 0.1s;
          white-space: nowrap;
        }
        .sidebar-item:hover { background: var(--bg-subtle); color: var(--text-primary); text-decoration: none; }
        .sidebar-item-active { background: var(--gold-50); color: var(--gold-700); }
        .dark .sidebar-item-active {
          background: color-mix(in srgb, var(--gold-700) 15%, transparent);
          color: var(--gold-400);
        }
        .sidebar-item-icon { flex-shrink: 0; }
        .sidebar-item-label { flex: 1; }

        /* ─── Group label ───────────────────────────────────── */
        .sidebar-group-label {
          display: flex; align-items: center; gap: 5px;
          padding: 8px 10px 3px;
          font-size: 0.67rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: var(--text-muted);
        }

        /* ─── Epic row ──────────────────────────────────────── */
        .sidebar-epic-row {
          display: flex;
          align-items: center;
          border-radius: var(--radius-md);
          transition: background 0.1s;
        }
        .sidebar-epic-row:hover { background: var(--bg-subtle); }
        .sidebar-epic-row.sidebar-item-active { background: var(--gold-50); }
        .dark .sidebar-epic-row.sidebar-item-active {
          background: color-mix(in srgb, var(--gold-700) 15%, transparent);
        }

        .sidebar-epic-link {
          display: flex; align-items: center; gap: 6px;
          padding: 6px 8px;
          flex: 1; min-width: 0;
          text-decoration: none;
          color: var(--text-secondary);
        }
        .sidebar-epic-link:hover { text-decoration: none; color: var(--text-primary); }
        .sidebar-epic-row.sidebar-item-active .sidebar-epic-link { color: var(--gold-700); }
        .dark .sidebar-epic-row.sidebar-item-active .sidebar-epic-link { color: var(--gold-400); }

        .sidebar-epic-icon { font-size: 0.85rem; flex-shrink: 0; }

        .sidebar-epic-id {
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--gold-600);
          flex-shrink: 0;
          min-width: 34px;
        }
        .dark .sidebar-epic-id { color: var(--gold-400); }
        .sidebar-epic-row.sidebar-item-active .sidebar-epic-id { color: var(--gold-700); }

        .sidebar-epic-title {
          font-size: 0.78rem;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
        }

        .sidebar-epic-toggle {
          display: flex; align-items: center; justify-content: center;
          width: 22px; height: 22px; flex-shrink: 0;
          border: none; background: transparent;
          cursor: pointer; color: var(--text-muted);
          border-radius: var(--radius-sm);
          transition: background 0.1s, color 0.1s;
          margin-right: 4px;
        }
        .sidebar-epic-toggle:hover { background: var(--bg-muted); color: var(--text-primary); }

        /* ─── Stories list ──────────────────────────────────── */
        .sidebar-stories {
          padding: 2px 0 4px 28px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .sidebar-story-empty {
          font-size: 0.72rem;
          color: var(--text-muted);
          padding: 3px 8px;
          font-style: italic;
        }

        .sidebar-story-item {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px 4px 2px;
          border-radius: var(--radius-sm);
          text-decoration: none;
          color: var(--text-muted);
          font-size: 0.74rem;
          transition: background 0.1s, color 0.1s;
          overflow: hidden;
        }
        .sidebar-story-item:hover { background: var(--bg-subtle); color: var(--text-primary); text-decoration: none; }
        .sidebar-story-active { color: var(--gold-600); background: var(--gold-50); }
        .dark .sidebar-story-active { color: var(--gold-400); }

        /* Priority dot */
        .sidebar-story-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .dot-must { background: var(--priority-must); }
        .dot-should { background: var(--priority-should); }
        .dot-nice { background: var(--priority-nice); }

        .sidebar-story-id {
          font-size: 0.67rem;
          font-weight: 600;
          color: var(--text-muted);
          flex-shrink: 0;
          min-width: 62px;
        }

        .sidebar-story-title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
        }

        /* ─── Divider ───────────────────────────────────────── */
        .sidebar-divider {
          height: 1px;
          background: var(--border);
          margin: 6px 4px;
        }

        /* ─── Collapse btn ──────────────────────────────────── */
        .sidebar-collapse-btn {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 10px 12px;
          border: none; border-top: 1px solid var(--border);
          background: transparent;
          cursor: pointer; color: var(--text-muted);
          font-size: 0.78rem; width: 100%;
          transition: color 0.1s, background 0.1s;
          flex-shrink: 0;
        }
        .sidebar-collapse-btn:hover { background: var(--bg-subtle); color: var(--text-primary); }

        /* ─── Mobile ────────────────────────────────────────── */
        .lg-hidden { display: none; }

        @media (max-width: 1023px) {
          .sidebar { transform: translateX(-100%); }
          .sidebar-open { transform: translateX(0); }
          .sidebar-collapsed {
            width: var(--sidebar-w);
            transform: translateX(-100%);
          }
          .sidebar-open.sidebar-collapsed { transform: translateX(0); }
          .lg-hidden { display: flex; }
          .sidebar-collapse-btn { display: none; }
        }
      `}</style>
    </>
  );
}

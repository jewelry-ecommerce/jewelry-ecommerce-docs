'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Filter, X, Search } from 'lucide-react';
import { allStories } from '@/content/stories';
import { epics } from '@/content/epics';
import { getEpicIcon, PRIORITY_COLOR, STATUS_COLOR, STATUS_LABEL, PRIORITY_LABEL } from '@/lib/utils';
import type { Priority, StoryStatus, Owner } from '@/content/types';

const PRIORITIES: Priority[] = ['MUST', 'SHOULD', 'NICE'];
const STATUSES: StoryStatus[] = ['DRAFT', 'READY', 'IN_PROGRESS', 'DONE'];
const OWNERS: Owner[] = ['FE', 'BE', 'Both'];

export default function BacklogPage() {
  const [search, setSearch] = useState('');
  const [filterEpic, setFilterEpic] = useState('');
  const [filterPriority, setFilterPriority] = useState<Priority | ''>('');
  const [filterStatus, setFilterStatus] = useState<StoryStatus | ''>('');
  const [filterOwner, setFilterOwner] = useState<Owner | ''>('');

  const filtered = useMemo(() => {
    let stories = allStories;
    if (search.trim()) {
      const q = search.toLowerCase();
      stories = stories.filter(
        (s) =>
          s.id.toLowerCase().includes(q) ||
          s.title.toLowerCase().includes(q) ||
          s.actor.toLowerCase().includes(q)
      );
    }
    if (filterEpic) stories = stories.filter((s) => s.epicId === filterEpic);
    if (filterPriority) stories = stories.filter((s) => s.priority === filterPriority);
    if (filterStatus) stories = stories.filter((s) => s.status === filterStatus);
    if (filterOwner) stories = stories.filter((s) => s.owner === filterOwner);
    return stories;
  }, [search, filterEpic, filterPriority, filterStatus, filterOwner]);

  const hasFilters = filterEpic || filterPriority || filterStatus || filterOwner;

  const clearFilters = () => {
    setFilterEpic('');
    setFilterPriority('');
    setFilterStatus('');
    setFilterOwner('');
    setSearch('');
  };

  return (
    <div className="backlog-page animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Product Backlog</h1>
          <p className="page-subtitle">
            {filtered.length} / {allStories.length} User Stories
          </p>
        </div>
        {hasFilters && (
          <button className="clear-btn" onClick={clearFilters}>
            <X size={14} />
            Xóa bộ lọc
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="filters-bar surface">
        <div className="filter-search-wrap">
          <Search size={14} className="filter-search-icon" />
          <input
            type="text"
            placeholder="Tìm theo ID, tiêu đề, actor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="filter-search-input"
          />
        </div>

        <div className="filters-row">
          <Filter size={14} className="filter-icon" />

          <select
            value={filterEpic}
            onChange={(e) => setFilterEpic(e.target.value)}
            className="filter-select"
            aria-label="Filter by epic"
          >
            <option value="">Tất cả Epics</option>
            {epics.map((e) => (
              <option key={e.id} value={e.id}>
                {e.id} — {e.title}
              </option>
            ))}
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as Priority | '')}
            className="filter-select"
            aria-label="Filter by priority"
          >
            <option value="">Mọi Priority</option>
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as StoryStatus | '')}
            className="filter-select"
            aria-label="Filter by status"
          >
            <option value="">Mọi Status</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{STATUS_LABEL[s]}</option>
            ))}
          </select>

          <select
            value={filterOwner}
            onChange={(e) => setFilterOwner(e.target.value as Owner | '')}
            className="filter-select"
            aria-label="Filter by owner"
          >
            <option value="">Mọi Owner</option>
            {OWNERS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      {filtered.length > 0 ? (
        <div className="table-wrap surface">
          <table className="doc-table backlog-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Epic</th>
                <th>Tiêu đề</th>
                <th>Actor</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Owner</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((story) => {
                return (
                  <tr key={story.id}>
                    <td>
                      <code className="story-id">{story.id}</code>
                    </td>
                    <td>
                      <span className="epic-chip">
                        {getEpicIcon(story.epicId)} {story.epicId}
                      </span>
                    </td>
                    <td className="story-title-cell">{story.title}</td>
                    <td className="actor-cell">{story.actor}</td>
                    <td>
                      <PriorityBadge priority={story.priority} />
                    </td>
                    <td>
                      <StatusBadge status={story.status} />
                    </td>
                    <td>
                      <OwnerBadge owner={story.owner} />
                    </td>
                    <td>
                      <Link
                        href={`/epics/${story.epicId.toLowerCase()}#${story.id.toLowerCase()}`}
                        className="story-link"
                      >
                        →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state surface">
          <Search size={32} className="empty-icon" />
          <p>Không tìm thấy User Story nào</p>
          <button className="clear-btn" onClick={clearFilters}>Xóa bộ lọc</button>
        </div>
      )}

      <style>{`
        .backlog-page { display: flex; flex-direction: column; gap: 20px; padding-bottom: 60px; }

        .page-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 12px;
        }

        .page-subtitle { color: var(--text-muted); font-size: 0.875rem; margin-top: 4px; }

        .clear-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border: 1px solid var(--border);
          background: var(--bg-surface);
          border-radius: var(--radius-md);
          font-size: 0.8rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: background 0.1s;
        }
        .clear-btn:hover { background: var(--bg-subtle); }

        .filters-bar {
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-radius: var(--radius-lg);
        }

        .filter-search-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
        }

        .filter-search-icon { color: var(--text-muted); flex-shrink: 0; }

        .filter-search-input {
          flex: 1;
          border: none;
          background: transparent;
          outline: none;
          font-size: 0.875rem;
          color: var(--text-primary);
          font-family: inherit;
        }

        .filters-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .filter-icon { color: var(--text-muted); flex-shrink: 0; }

        .filter-select {
          padding: 6px 10px;
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          font-size: 0.8rem;
          color: var(--text-secondary);
          cursor: pointer;
          outline: none;
          font-family: inherit;
        }

        .filter-select:focus { border-color: var(--gold-400); }

        .table-wrap {
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .backlog-table { width: 100%; }

        .story-id {
          font-size: 0.75rem;
          color: var(--text-secondary);
          background: none;
          border: none;
          padding: 0;
          white-space: nowrap;
        }

        .epic-chip {
          font-size: 0.75rem;
          color: var(--text-muted);
          white-space: nowrap;
        }

        .story-title-cell {
          max-width: 300px;
        }

        .actor-cell {
          font-size: 0.8rem;
          white-space: nowrap;
          max-width: 140px;
        }

        .story-link {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px 8px;
          background: var(--bg-subtle);
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          color: var(--text-secondary);
          transition: background 0.1s, color 0.1s;
        }
        .story-link:hover { background: var(--gold-100); color: var(--gold-700); text-decoration: none; }

        .empty-state {
          padding: 48px;
          text-align: center;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          color: var(--text-muted);
        }

        .empty-icon { opacity: 0.4; }

        @media (max-width: 768px) {
          .filters-row { flex-direction: column; align-items: flex-start; }
          .backlog-table { font-size: 0.8rem; }
        }
      `}</style>
    </div>
  );
}

function PriorityBadge({ priority }: { priority: Priority }) {
  const colors = PRIORITY_COLOR[priority];
  return (
    <span
      className="badge"
      style={{ background: colors.bg, color: colors.text, borderColor: colors.border }}
    >
      {PRIORITY_LABEL[priority]}
    </span>
  );
}

function StatusBadge({ status }: { status: StoryStatus }) {
  const colors = STATUS_COLOR[status];
  return (
    <span
      className="badge"
      style={{ background: colors.bg, color: colors.text, borderColor: 'transparent' }}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

function OwnerBadge({ owner }: { owner: Owner }) {
  const color = owner === 'FE' ? 'var(--violet-600)' : owner === 'BE' ? 'var(--status-ready)' : 'var(--text-secondary)';
  return (
    <span className="badge" style={{ color, background: 'transparent', borderColor: 'currentColor', opacity: 0.8 }}>
      {owner}
    </span>
  );
}

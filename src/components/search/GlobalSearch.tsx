'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Search, X, ArrowRight, Layers, List, BookOpen, GitFork, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { epics } from '@/content/epics';
import { allStories } from '@/content/stories';
import { glossary } from '@/content/rules';
import type { SearchResult } from '@/content/types';

interface GlobalSearchProps {
  onClose: () => void;
}

const TYPE_ICON = {
  epic: Layers,
  story: List,
  rule: BookOpen,
  flow: GitFork,
  decision: FileText,
  glossary: BookOpen,
};

const TYPE_LABEL: Record<SearchResult['type'], string> = {
  epic: 'Epic',
  story: 'User Story',
  rule: 'Business Rule',
  flow: 'Flow',
  decision: 'Decision',
  glossary: 'Glossary',
};

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  for (const epic of epics) {
    results.push({
      type: 'epic',
      id: epic.id,
      title: `${epic.id} — ${epic.title}`,
      subtitle: epic.goal,
      href: `/epics/${epic.id.toLowerCase()}`,
    });
  }

  for (const story of allStories) {
    results.push({
      type: 'story',
      id: story.id,
      title: `${story.id} — ${story.title}`,
      subtitle: story.actor,
      href: `/epics/${story.epicId.toLowerCase()}#${story.id.toLowerCase()}`,
      snippet: story.objective,
    });
  }

  for (const term of glossary) {
    results.push({
      type: 'glossary',
      id: term.id,
      title: term.term,
      href: `/rules#${term.id.toLowerCase()}`,
      snippet: term.definition,
    });
  }

  return results;
}

const SEARCH_INDEX = buildIndex();

function searchContent(query: string): SearchResult[] {
  if (!query.trim() || query.length < 2) return [];
  const q = query.toLowerCase().normalize('NFC');

  return SEARCH_INDEX.filter((item) => {
    const haystack = [item.title, item.subtitle ?? '', item.snippet ?? '']
      .join(' ')
      .toLowerCase()
      .normalize('NFC');
    return haystack.includes(q);
  }).slice(0, 15);
}

export function GlobalSearch({ onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchContent(query), [query]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelectedIdx(0);
  }, [query]);

  const navigate = useCallback(
    (result: SearchResult) => {
      router.push(result.href);
      onClose();
    },
    [router, onClose]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIdx((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && results[selectedIdx]) {
        navigate(results[selectedIdx]!);
      }
    },
    [results, selectedIdx, navigate, onClose]
  );

  return (
    <div className="search-backdrop" onClick={onClose} role="dialog" aria-modal aria-label="Search">
      <div className="search-modal" onClick={(e) => e.stopPropagation()} onKeyDown={handleKeyDown}>
        {/* Search input */}
        <div className="search-input-wrap">
          <Search size={16} className="search-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Tìm Epic, User Story, Glossary..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
            aria-label="Search query"
          />
          {query && (
            <button className="search-clear" onClick={() => setQuery('')} aria-label="Clear">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="search-results" role="listbox">
            {results.map((result: SearchResult, idx: number) => {
              const Icon = TYPE_ICON[result.type] ?? List;
              return (
                <button
                  key={`${result.type}-${result.id}`}
                  className={`search-result-item ${idx === selectedIdx ? 'search-result-selected' : ''}`}
                  onClick={() => navigate(result)}
                  role="option"
                  aria-selected={idx === selectedIdx}
                >
                  <Icon size={15} className="search-result-icon" />
                  <div className="search-result-content">
                    <div className="search-result-title">{result.title}</div>
                    {result.snippet && (
                      <div className="search-result-snippet">{result.snippet.slice(0, 80)}…</div>
                    )}
                  </div>
                  <span className="search-result-type">{TYPE_LABEL[result.type]}</span>
                  <ArrowRight size={12} className="search-result-arrow" />
                </button>
              );
            })}
          </div>
        )}

        {query.length >= 2 && results.length === 0 && (
          <div className="search-empty">
            <Search size={24} className="search-empty-icon" />
            <p>Không tìm thấy kết quả cho &ldquo;{query}&rdquo;</p>
          </div>
        )}

        {!query && (
          <div className="search-hints">
            <span>↑↓ Điều hướng</span>
            <span>↵ Chọn</span>
            <span>Esc Đóng</span>
          </div>
        )}
      </div>

      <style>{`
        .search-backdrop {
          position: fixed;
          inset: 0;
          background: rgb(0 0 0 / 0.5);
          backdrop-filter: blur(4px);
          z-index: 100;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 80px 16px 16px;
        }

        .search-modal {
          width: 100%;
          max-width: 620px;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          animation: fadeIn 0.15s ease-out;
        }

        .search-input-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          border-bottom: 1px solid var(--border);
        }

        .search-icon { color: var(--text-muted); flex-shrink: 0; }

        .search-input {
          flex: 1;
          border: none;
          background: transparent;
          outline: none;
          font-size: 1rem;
          color: var(--text-primary);
          font-family: inherit;
        }

        .search-input::placeholder { color: var(--text-muted); }

        .search-clear {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border: none;
          background: var(--bg-subtle);
          border-radius: 50%;
          cursor: pointer;
          color: var(--text-muted);
        }

        .search-results {
          max-height: 360px;
          overflow-y: auto;
          padding: 6px;
        }

        .search-result-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 10px 12px;
          border: none;
          background: transparent;
          cursor: pointer;
          border-radius: var(--radius-md);
          text-align: left;
          transition: background 0.1s;
        }

        .search-result-item:hover,
        .search-result-selected {
          background: var(--bg-subtle);
        }

        .search-result-icon { color: var(--text-muted); flex-shrink: 0; }

        .search-result-content { flex: 1; min-width: 0; }

        .search-result-title {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .search-result-snippet {
          font-size: 0.75rem;
          color: var(--text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .search-result-type {
          font-size: 0.7rem;
          color: var(--text-muted);
          background: var(--bg-muted);
          padding: 2px 6px;
          border-radius: 4px;
          flex-shrink: 0;
        }

        .search-result-arrow { color: var(--text-muted); flex-shrink: 0; }

        .search-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 32px;
          color: var(--text-muted);
          font-size: 0.875rem;
        }

        .search-empty-icon { opacity: 0.5; }

        .search-hints {
          display: flex;
          gap: 16px;
          padding: 10px 16px;
          border-top: 1px solid var(--border);
          font-size: 0.75rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}

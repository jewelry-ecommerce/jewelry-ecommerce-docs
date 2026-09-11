import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';
import { getEpicById, epicOrder } from '@/content/epics';
import { getStoriesByEpic } from '@/content/stories';
import { getEpicIcon, PRIORITY_COLOR, STATUS_COLOR, STATUS_LABEL, PRIORITY_LABEL } from '@/lib/utils';
import type { UserStory } from '@/content/types';

interface PageProps {
  params: Promise<{ epicId: string }>;
}

export function generateStaticParams() {
  return epicOrder.map((id: string) => ({ epicId: id.toLowerCase() }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { epicId } = await params;
  const epic = getEpicById(epicId.toUpperCase());
  if (!epic) return {};
  return { title: `${epic.id} — ${epic.title}` };
}

export default async function EpicDetailPage({ params }: PageProps) {
  const { epicId } = await params;
  const epic = getEpicById(epicId.toUpperCase());
  if (!epic) notFound();

  const stories = getStoriesByEpic(epic.id);
  const currentIdx = epicOrder.indexOf(epic.id as (typeof epicOrder)[number]);
  const prevEpicId = currentIdx > 0 ? epicOrder[currentIdx - 1] : null;
  const nextEpicId = currentIdx < epicOrder.length - 1 ? epicOrder[currentIdx + 1] : null;
  const prevEpic = prevEpicId ? getEpicById(prevEpicId) : null;
  const nextEpic = nextEpicId ? getEpicById(nextEpicId) : null;

  return (
    <div className="epic-detail-page animate-fade-in">
      {/* Breadcrumb */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/epics">Epics</Link>
        <span>/</span>
        <span className="gold-text">{epic.id}</span>
      </nav>

      {/* Epic Header */}
      <header className="epic-header surface">
        <div className="epic-header-top">
          <span className="epic-header-icon">{getEpicIcon(epic.id)}</span>
          <div>
            <div className="epic-header-id gold-text">{epic.id}</div>
            <h1 className="epic-header-title">{epic.title}</h1>
          </div>
        </div>
        <p className="epic-header-desc">{epic.description}</p>

        <div className="epic-meta-grid">
          {/* Dependencies */}
          <div className="meta-block">
            <div className="meta-label">Dependencies</div>
            {epic.dependencies.length > 0 ? (
              <div className="meta-chips">
                {epic.dependencies.map((dep) => (
                  <Link key={dep} href={`/epics/${dep.toLowerCase()}`} className="dep-chip">
                    {dep}
                  </Link>
                ))}
              </div>
            ) : (
              <span className="meta-none">Không có</span>
            )}
          </div>

          {/* Stories count */}
          <div className="meta-block">
            <div className="meta-label">User Stories</div>
            <div className="meta-chips">
              <span className="badge" style={{ background: 'var(--priority-must-bg)', color: 'var(--priority-must)', borderColor: 'var(--priority-must-border)' }}>
                {stories.filter((s) => s.priority === 'MUST').length} MUST
              </span>
              <span className="badge" style={{ background: 'var(--priority-should-bg)', color: 'var(--priority-should)', borderColor: 'var(--priority-should-border)' }}>
                {stories.filter((s) => s.priority === 'SHOULD').length} SHOULD
              </span>
            </div>
          </div>
        </div>

        {/* Success Criteria */}
        <div className="criteria-section">
          <div className="criteria-title">
            <CheckCircle2 size={15} />
            Success Criteria
          </div>
          <ul className="criteria-list">
            {epic.successCriteria.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>

        {/* Out of scope */}
        {epic.outOfScope.length > 0 && (
          <div className="criteria-section">
            <div className="criteria-title oos-title">
              <XCircle size={15} />
              Out of Scope
            </div>
            <ul className="criteria-list oos-list">
              {epic.outOfScope.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Stories */}
      <section>
        <h2 className="stories-heading">User Stories ({stories.length})</h2>
        <div className="stories-list">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      {/* Pagination */}
      <nav className="epic-pagination">
        {prevEpic ? (
          <Link href={`/epics/${prevEpic.id.toLowerCase()}`} className="pagination-btn surface">
            <ChevronLeft size={16} />
            <div>
              <div className="pagination-dir">Trước</div>
              <div className="pagination-title">{prevEpic.id} — {prevEpic.title}</div>
            </div>
          </Link>
        ) : <div />}

        {nextEpic && (
          <Link href={`/epics/${nextEpic.id.toLowerCase()}`} className="pagination-btn pagination-right surface">
            <div>
              <div className="pagination-dir">Tiếp theo</div>
              <div className="pagination-title">{nextEpic.id} — {nextEpic.title}</div>
            </div>
            <ChevronRight size={16} />
          </Link>
        )}
      </nav>

      <style>{`
        .epic-detail-page { display: flex; flex-direction: column; gap: 28px; padding-bottom: 60px; }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .breadcrumb a { color: var(--text-muted); }
        .breadcrumb a:hover { color: var(--text-primary); }

        .epic-header {
          padding: 24px;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .epic-header-top { display: flex; align-items: flex-start; gap: 16px; }

        .epic-header-icon { font-size: 2rem; flex-shrink: 0; }

        .epic-header-id { font-size: 0.8rem; font-weight: 600; margin-bottom: 4px; }

        .epic-header-title { font-size: 1.4rem; font-weight: 700; }

        .epic-header-desc { color: var(--text-secondary); line-height: 1.6; }

        .epic-meta-grid { display: flex; gap: 24px; flex-wrap: wrap; }

        .meta-block { display: flex; flex-direction: column; gap: 6px; }

        .meta-label { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); }

        .meta-chips { display: flex; gap: 6px; flex-wrap: wrap; }

        .dep-chip {
          padding: 3px 8px;
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          color: var(--gold-600);
          font-weight: 500;
          text-decoration: none;
        }
        .dep-chip:hover { background: var(--gold-50); text-decoration: none; }
        .dark .dep-chip { color: var(--gold-400); }

        .meta-none { font-size: 0.8rem; color: var(--text-muted); font-style: italic; }

        .criteria-section { display: flex; flex-direction: column; gap: 8px; }

        .criteria-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--status-done);
        }

        .oos-title { color: var(--text-muted); }

        .criteria-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .criteria-list li {
          font-size: 0.875rem;
          color: var(--text-secondary);
          padding-left: 16px;
          position: relative;
          line-height: 1.5;
        }

        .criteria-list li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--status-done);
          font-size: 0.75rem;
        }

        .oos-list li::before { content: '✕'; color: var(--text-muted); }

        .stories-heading { margin-bottom: 12px; }

        .stories-list { display: flex; flex-direction: column; gap: 20px; }

        .epic-pagination {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          padding-top: 16px;
          border-top: 1px solid var(--border);
        }

        .pagination-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: var(--radius-md);
          text-decoration: none;
          flex: 1;
          max-width: 300px;
          transition: box-shadow 0.15s;
        }
        .pagination-btn:hover { box-shadow: var(--shadow-md); text-decoration: none; }
        .pagination-right { justify-content: flex-end; text-align: right; }

        .pagination-dir { font-size: 0.75rem; color: var(--text-muted); }
        .pagination-title { font-size: 0.825rem; font-weight: 500; color: var(--text-primary); }
      `}</style>
    </div>
  );
}

function StoryCard({ story }: { story: UserStory }) {
  const priorityColors = PRIORITY_COLOR[story.priority];
  const statusColors = STATUS_COLOR[story.status];

  return (
    <div id={story.id.toLowerCase()} className="story-card surface">
      {/* Story header */}
      <div className="story-card-header">
        <div className="story-id-area">
          <code className="story-code">{story.id}</code>
          <span
            className="badge"
            style={{ background: priorityColors.bg, color: priorityColors.text, borderColor: priorityColors.border }}
          >
            {PRIORITY_LABEL[story.priority]}
          </span>
          <span
            className="badge"
            style={{ background: statusColors.bg, color: statusColors.text, borderColor: 'transparent' }}
          >
            {STATUS_LABEL[story.status]}
          </span>
          <span className="story-owner-tag">
            {story.owner}
          </span>
        </div>
        <h3 className="story-title">{story.title}</h3>
        <div className="story-actor">Actor: <strong>{story.actor}</strong></div>
      </div>

      {/* User story statement */}
      <blockquote className="user-story-quote">
        {story.userStory}
      </blockquote>

      {/* Objective */}
      <div className="story-section">
        <div className="story-section-label">Mục tiêu</div>
        <p className="story-section-content">{story.objective}</p>
      </div>

      {/* Main flow */}
      {story.mainFlow.length > 0 && (
        <div className="story-section">
          <div className="story-section-label">Luồng chính</div>
          <ol className="flow-list">
            {story.mainFlow.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}

      {/* Business Rules */}
      {story.businessRules.length > 0 && (
        <div className="story-section">
          <div className="story-section-label">Business Rules</div>
          <div className="rules-list">
            {story.businessRules.map((rule) => (
              <div key={rule.id} className="rule-item">
                <code className="rule-id">{rule.id}</code>
                {rule.group && <span className="rule-group">{rule.group}</span>}
                <span className="rule-text">{rule.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Acceptance Criteria */}
      {story.acceptanceCriteria.length > 0 && (
        <div className="story-section">
          <div className="story-section-label">Acceptance Criteria</div>
          <div className="ac-list">
            {story.acceptanceCriteria.map((ac) => (
              <div key={ac.id} className="ac-item">
                <code className="ac-id">{ac.id}</code>
                <table className="ac-table">
                  <tbody>
                    <tr>
                      <td className="ac-key">Given</td>
                      <td>{ac.given}</td>
                    </tr>
                    <tr>
                      <td className="ac-key">When</td>
                      <td>{ac.when}</td>
                    </tr>
                    <tr>
                      <td className="ac-key">Then</td>
                      <td>{ac.then}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes, Edge Cases, Out of Scope */}
      <div className="story-bottom-row">
        {story.notes.length > 0 && (
          <div className="story-mini-section">
            <div className="story-section-label">Notes</div>
            <ul className="mini-list">
              {story.notes.map((n, i) => <li key={i}>{n}</li>)}
            </ul>
          </div>
        )}
        {story.edgeCases.length > 0 && (
          <div className="story-mini-section">
            <div className="story-section-label warning-label">⚠ Edge Cases</div>
            <ul className="mini-list">
              {story.edgeCases.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          </div>
        )}
        {story.outOfScope.length > 0 && (
          <div className="story-mini-section">
            <div className="story-section-label muted-label">✕ Out of Scope</div>
            <ul className="mini-list">
              {story.outOfScope.map((o, i) => <li key={i}>{o}</li>)}
            </ul>
          </div>
        )}
      </div>

      {/* Dependencies */}
      {story.dependencies.length > 0 && (
        <div className="story-deps">
          <span className="story-deps-label">Depends on:</span>
          {story.dependencies.map((dep) => (
            <a key={dep} href={`#${dep.toLowerCase()}`} className="dep-link">{dep}</a>
          ))}
        </div>
      )}

      <style>{`
        .story-card {
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .story-card-header {
          padding: 18px 20px 14px;
          border-bottom: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .story-id-area { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }

        .story-code {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .story-owner-tag {
          margin-left: auto;
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--text-muted);
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          padding: 2px 7px;
          border-radius: 4px;
        }

        .story-title { font-size: 1rem; font-weight: 600; color: var(--text-primary); margin: 0; }

        .story-actor { font-size: 0.8rem; color: var(--text-muted); }
        .story-actor strong { color: var(--text-secondary); }

        .user-story-quote {
          margin: 0;
          padding: 12px 20px;
          background: var(--gold-50);
          border-left: 3px solid var(--gold-400);
          font-size: 0.875rem;
          color: var(--text-secondary);
          font-style: italic;
          line-height: 1.6;
        }
        .dark .user-story-quote {
          background: color-mix(in srgb, var(--gold-700) 10%, var(--bg-surface));
          border-color: var(--gold-600);
        }

        .story-section {
          padding: 14px 20px;
          border-top: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .story-section-label {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }

        .warning-label { color: var(--priority-should); }
        .muted-label { color: var(--text-muted); }

        .story-section-content { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin: 0; }

        .flow-list {
          list-style: decimal;
          padding-left: 20px;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .flow-list li { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5; }

        .rules-list { display: flex; flex-direction: column; gap: 6px; }

        .rule-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.8rem;
          flex-wrap: wrap;
        }

        .rule-id {
          font-size: 0.7rem;
          color: var(--text-muted);
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          padding: 1px 5px;
          border-radius: 3px;
          flex-shrink: 0;
        }

        .rule-group {
          padding: 1px 6px;
          background: var(--bg-muted);
          border-radius: 3px;
          font-size: 0.7rem;
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .rule-text { color: var(--text-secondary); line-height: 1.5; }

        .ac-list { display: flex; flex-direction: column; gap: 12px; }

        .ac-item { display: flex; flex-direction: column; gap: 4px; }

        .ac-id {
          font-size: 0.7rem;
          color: var(--text-muted);
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          padding: 1px 5px;
          border-radius: 3px;
          align-self: flex-start;
        }

        .ac-table { width: 100%; border-collapse: collapse; }
        .ac-table td { padding: 4px 8px; font-size: 0.8rem; vertical-align: top; }
        .ac-table tr { border-bottom: 1px solid var(--border); }
        .ac-table tr:last-child { border-bottom: none; }

        .ac-key {
          font-weight: 600;
          color: var(--text-muted);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          width: 50px;
          background: var(--bg-subtle);
          white-space: nowrap;
        }

        .story-bottom-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          border-top: 1px solid var(--border);
        }

        .story-mini-section {
          padding: 12px 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          border-right: 1px solid var(--border);
        }
        .story-mini-section:last-child { border-right: none; }

        .mini-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .mini-list li {
          font-size: 0.78rem;
          color: var(--text-muted);
          padding-left: 12px;
          position: relative;
          line-height: 1.4;
        }

        .mini-list li::before {
          content: '–';
          position: absolute;
          left: 0;
          color: var(--border-strong);
        }

        .story-deps {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-top: 1px solid var(--border);
          flex-wrap: wrap;
        }

        .story-deps-label { font-size: 0.75rem; color: var(--text-muted); }

        .dep-link {
          font-size: 0.75rem;
          color: var(--gold-600);
          background: var(--gold-50);
          padding: 2px 7px;
          border-radius: 4px;
          border: 1px solid var(--gold-200);
          text-decoration: none;
        }
        .dep-link:hover { background: var(--gold-100); text-decoration: none; }
        .dark .dep-link { color: var(--gold-400); background: color-mix(in srgb, var(--gold-700) 15%, transparent); border-color: color-mix(in srgb, var(--gold-500) 30%, transparent); }
      `}</style>
    </div>
  );
}

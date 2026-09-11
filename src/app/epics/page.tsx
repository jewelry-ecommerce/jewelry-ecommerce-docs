import Link from 'next/link';
import type { Metadata } from 'next';
import { epics } from '@/content/epics';
import { allStories } from '@/content/stories';
import { getEpicIcon } from '@/lib/utils';

export const metadata: Metadata = { title: 'Epics Overview' };

export default function EpicsPage() {
  return (
    <div className="epics-page animate-fade-in">
      <div className="page-header">
        <h1>Product Epics</h1>
        <p>10 Epics chia theo domain, mỗi epic chứa 5-6 User Stories.</p>
      </div>

      <div className="epics-list">
        {epics.map((epic) => {
          const stories = allStories.filter((s) => s.epicId === epic.id);
          const mustCount = stories.filter((s) => s.priority === 'MUST').length;
          const shouldCount = stories.filter((s) => s.priority === 'SHOULD').length;
          const niceCount = stories.filter((s) => s.priority === 'NICE').length;

          return (
            <Link
              key={epic.id}
              href={`/epics/${epic.id.toLowerCase()}`}
              className="epic-row surface"
            >
              <div className="epic-row-left">
                <div className="epic-row-icon">{getEpicIcon(epic.id)}</div>
                <div>
                  <div className="epic-row-id gold-text">{epic.id}</div>
                  <div className="epic-row-title">{epic.title}</div>
                  <div className="epic-row-goal">{epic.goal}</div>
                </div>
              </div>

              <div className="epic-row-right">
                <div className="epic-row-stat">
                  <span className="stat-must">{mustCount} MUST</span>
                  {shouldCount > 0 && <span className="stat-should">{shouldCount} SHOULD</span>}
                  {niceCount > 0 && <span className="stat-nice">{niceCount} NICE</span>}
                </div>
                <div className="epic-row-dep">
                  {epic.dependencies.length > 0
                    ? `Depends on: ${epic.dependencies.join(', ')}`
                    : 'No dependencies'}
                </div>
                <span className="epic-arrow">→</span>
              </div>
            </Link>
          );
        })}
      </div>

      <style>{`
        .epics-page { display: flex; flex-direction: column; gap: 24px; padding-bottom: 60px; }

        .page-header { margin-bottom: 4px; }
        .page-header p { color: var(--text-secondary); margin-top: 6px; }

        .epics-list { display: flex; flex-direction: column; gap: 10px; }

        .epic-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          border-radius: var(--radius-lg);
          text-decoration: none;
          transition: box-shadow 0.15s, transform 0.1s;
          cursor: pointer;
        }
        .epic-row:hover { box-shadow: var(--shadow-md); transform: translateY(-1px); text-decoration: none; }

        .epic-row-left { display: flex; align-items: flex-start; gap: 14px; flex: 1; min-width: 0; }

        .epic-row-icon { font-size: 1.5rem; flex-shrink: 0; margin-top: 2px; }

        .epic-row-id { font-size: 0.75rem; font-weight: 600; margin-bottom: 2px; }

        .epic-row-title { font-size: 0.975rem; font-weight: 600; color: var(--text-primary); margin-bottom: 4px; }

        .epic-row-goal { font-size: 0.825rem; color: var(--text-muted); line-height: 1.4; }

        .epic-row-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
          flex-shrink: 0;
        }

        .epic-row-stat { display: flex; gap: 6px; flex-wrap: wrap; justify-content: flex-end; }

        .stat-must {
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--priority-must);
          background: var(--priority-must-bg);
          border: 1px solid var(--priority-must-border);
          padding: 2px 7px;
          border-radius: 9999px;
        }

        .stat-should {
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--priority-should);
          background: var(--priority-should-bg);
          border: 1px solid var(--priority-should-border);
          padding: 2px 7px;
          border-radius: 9999px;
        }

        .stat-nice {
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--priority-nice);
          background: var(--priority-nice-bg);
          border: 1px solid var(--priority-nice-border);
          padding: 2px 7px;
          border-radius: 9999px;
        }

        .epic-row-dep { font-size: 0.75rem; color: var(--text-muted); }

        .epic-arrow { font-size: 1rem; color: var(--text-muted); }

        @media (max-width: 640px) {
          .epic-row { flex-direction: column; align-items: flex-start; }
          .epic-row-right { align-items: flex-start; }
          .epic-arrow { display: none; }
        }
      `}</style>
    </div>
  );
}

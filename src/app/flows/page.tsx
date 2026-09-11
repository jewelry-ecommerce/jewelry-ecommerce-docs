import type { Metadata } from 'next';
import { customerFlows } from '@/content/flows';

export const metadata: Metadata = { title: 'End-to-End Flows' };

export default function FlowsPage() {
  return (
    <div className="flows-page animate-fade-in">
      <div className="page-header">
        <h1>End-to-End Customer Flows</h1>
        <p>Các luồng nghiệp vụ từ đầu đến cuối, mô tả tương tác giữa các actor và hệ thống.</p>
      </div>

      <div className="flows-list">
        {customerFlows.map((flow) => (
          <div key={flow.id} id={flow.id.toLowerCase()} className="flow-card surface">
            <div className="flow-header">
              <div className="flow-id gold-text">{flow.id}</div>
              <h2 className="flow-title">{flow.title}</h2>
              <p className="flow-desc">{flow.description}</p>
              <div className="flow-actors">
                {flow.actors.map((actor) => (
                  <span key={actor} className="actor-badge">{actor}</span>
                ))}
              </div>
            </div>

            <div className="flow-steps">
              <table className="doc-table flow-table">
                <thead>
                  <tr>
                    <th style={{ width: 40 }}>#</th>
                    <th style={{ width: 140 }}>Actor</th>
                    <th>Hành động</th>
                    <th>System Response</th>
                    <th>Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {flow.steps.map((step) => (
                    <tr key={step.step}>
                      <td>
                        <span className="step-num">{step.step}</span>
                      </td>
                      <td>
                        <span className="step-actor">{step.actor}</span>
                      </td>
                      <td>{step.action}</td>
                      <td className="system-response">{step.systemResponse ?? '—'}</td>
                      <td className="step-notes">{step.notes ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {flow.relatedStories.length > 0 && (
              <div className="flow-footer">
                <span className="flow-related-label">Related Stories:</span>
                {flow.relatedStories.map((storyId) => {
                  const epicId = storyId.split('-').slice(0, 2).join('-');
                  return (
                    <a
                      key={storyId}
                      href={`/epics/${epicId.toLowerCase()}#${storyId.toLowerCase()}`}
                      className="related-link"
                    >
                      {storyId}
                    </a>
                  );
                })}
              </div>
            )}

            {flow.notes && flow.notes.length > 0 && (
              <div className="flow-notes callout callout-info">
                <strong>Notes:</strong>
                <ul>
                  {flow.notes.map((n, i) => <li key={i}>{n}</li>)}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        .flows-page { display: flex; flex-direction: column; gap: 24px; padding-bottom: 60px; }

        .page-header { margin-bottom: 4px; }
        .page-header p { color: var(--text-secondary); margin-top: 6px; }

        .flows-list { display: flex; flex-direction: column; gap: 24px; }

        .flow-card { border-radius: var(--radius-lg); overflow: hidden; }

        .flow-header {
          padding: 20px 20px 16px;
          border-bottom: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .flow-id { font-size: 0.75rem; font-weight: 600; }

        .flow-title { font-size: 1.1rem; font-weight: 600; margin: 0; }

        .flow-desc { color: var(--text-secondary); font-size: 0.875rem; margin: 0; line-height: 1.5; }

        .flow-actors { display: flex; gap: 6px; flex-wrap: wrap; }

        .actor-badge {
          padding: 3px 8px;
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          border-radius: 9999px;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .flow-steps { overflow-x: auto; }

        .flow-table { min-width: 600px; }

        .step-num {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          background: var(--gold-100);
          color: var(--gold-700);
          border-radius: 50%;
          font-size: 0.7rem;
          font-weight: 700;
        }
        .dark .step-num {
          background: color-mix(in srgb, var(--gold-700) 20%, transparent);
          color: var(--gold-400);
        }

        .step-actor { font-weight: 500; font-size: 0.8rem; color: var(--text-secondary); }

        .system-response { color: var(--text-muted); font-size: 0.8rem; }

        .step-notes { font-size: 0.78rem; color: var(--text-muted); font-style: italic; }

        .flow-footer {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          padding: 12px 20px;
          border-top: 1px solid var(--border);
        }

        .flow-related-label { font-size: 0.75rem; color: var(--text-muted); }

        .related-link {
          font-size: 0.75rem;
          color: var(--gold-600);
          background: var(--gold-50);
          padding: 2px 7px;
          border-radius: 4px;
          border: 1px solid var(--gold-200);
          text-decoration: none;
        }
        .related-link:hover { background: var(--gold-100); text-decoration: none; }
        .dark .related-link {
          color: var(--gold-400);
          background: color-mix(in srgb, var(--gold-700) 15%, transparent);
          border-color: color-mix(in srgb, var(--gold-500) 30%, transparent);
        }

        .flow-notes { margin: 0 20px 20px; }
        .flow-notes ul { margin: 6px 0 0 16px; padding: 0; }
        .flow-notes li { margin: 2px 0; }
      `}</style>
    </div>
  );
}

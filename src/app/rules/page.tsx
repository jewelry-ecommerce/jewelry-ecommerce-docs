import type { Metadata } from 'next';
import { globalBusinessRules, glossary } from '@/content/rules';

export const metadata: Metadata = { title: 'Global Business Rules & Glossary' };

const RULE_GROUPS = [...new Set(globalBusinessRules.map((r) => r.group))];

export default function RulesPage() {
  return (
    <div className="rules-page animate-fade-in">
      <div className="page-header">
        <h1>Global Business Rules & Glossary</h1>
        <p>Quy tắc nghiệp vụ toàn cục áp dụng cho toàn bộ hệ thống và thuật ngữ chuyên ngành.</p>
      </div>

      {/* Business Rules */}
      <section>
        <h2 className="section-title">Global Business Rules</h2>
        {RULE_GROUPS.map((group) => {
          const rules = globalBusinessRules.filter((r) => r.group === group);
          return (
            <div key={group} className="rule-group-section">
              <h3 className="rule-group-title">{group}</h3>
              <div className="rules-list">
                {rules.map((rule) => (
                  <div key={rule.id} id={rule.id.toLowerCase()} className="rule-card surface">
                    <div className="rule-card-header">
                      <code className="rule-code">{rule.id}</code>
                      <span className="rule-group-badge">{rule.group}</span>
                    </div>
                    <div className="rule-card-title">{rule.title}</div>
                    <div className="rule-card-desc">{rule.description}</div>
                    {rule.relatedStories && rule.relatedStories.length > 0 && (
                      <div className="rule-related">
                        {rule.relatedStories.map((storyId) => {
                          const parts = storyId.split('-');
                          const epicId = `${parts[0]}-${parts[1]}`.toLowerCase();
                          return (
                            <a key={storyId} href={`/epics/${epicId}#${storyId.toLowerCase()}`} className="related-chip">
                              {storyId}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Glossary */}
      <section>
        <h2 className="section-title">Glossary</h2>
        <div className="glossary-list surface">
          {glossary.map((term, i) => (
            <div
              key={term.id}
              id={term.id.toLowerCase()}
              className={`glossary-row ${i < glossary.length - 1 ? 'glossary-row-bordered' : ''}`}
            >
              <div className="glossary-term-area">
                <code className="glossary-id">{term.id}</code>
                <div className="glossary-term">{term.term}</div>
              </div>
              <div className="glossary-def">{term.definition}</div>
              {term.relatedTerms && term.relatedTerms.length > 0 && (
                <div className="glossary-related">
                  {term.relatedTerms.map((t) => (
                    <span key={t} className="related-term">{t}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .rules-page { display: flex; flex-direction: column; gap: 32px; padding-bottom: 60px; }

        .page-header { margin-bottom: 4px; }
        .page-header p { color: var(--text-secondary); margin-top: 6px; }

        .section-title { font-size: 1.125rem; font-weight: 600; margin-bottom: 16px; }

        .rule-group-section { margin-bottom: 20px; }

        .rule-group-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 10px;
          padding-bottom: 6px;
          border-bottom: 1px solid var(--border);
        }

        .rules-list { display: flex; flex-direction: column; gap: 10px; }

        .rule-card {
          padding: 14px 16px;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .rule-card-header { display: flex; align-items: center; gap: 8px; }

        .rule-code {
          font-size: 0.7rem;
          color: var(--text-muted);
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          padding: 1px 5px;
          border-radius: 3px;
        }

        .rule-group-badge {
          font-size: 0.7rem;
          color: var(--gold-600);
          background: var(--gold-50);
          border: 1px solid var(--gold-200);
          padding: 1px 6px;
          border-radius: 4px;
        }
        .dark .rule-group-badge {
          color: var(--gold-400);
          background: color-mix(in srgb, var(--gold-700) 15%, transparent);
          border-color: color-mix(in srgb, var(--gold-500) 30%, transparent);
        }

        .rule-card-title { font-size: 0.9rem; font-weight: 600; color: var(--text-primary); }

        .rule-card-desc { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; }

        .rule-related { display: flex; gap: 6px; flex-wrap: wrap; }

        .related-chip {
          font-size: 0.72rem;
          color: var(--text-muted);
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          padding: 2px 6px;
          border-radius: 4px;
          text-decoration: none;
        }
        .related-chip:hover { color: var(--gold-600); border-color: var(--gold-300); text-decoration: none; }

        /* Glossary */
        .glossary-list { border-radius: var(--radius-lg); overflow: hidden; }

        .glossary-row {
          display: grid;
          grid-template-columns: 180px 1fr auto;
          gap: 16px;
          padding: 14px 16px;
          align-items: start;
        }

        .glossary-row-bordered { border-bottom: 1px solid var(--border); }

        .glossary-term-area { display: flex; flex-direction: column; gap: 4px; }

        .glossary-id { font-size: 0.68rem; color: var(--text-muted); background: none; border: none; padding: 0; }

        .glossary-term { font-weight: 600; font-size: 0.9rem; color: var(--text-primary); }

        .glossary-def { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; }

        .glossary-related { display: flex; gap: 5px; flex-wrap: wrap; align-self: center; }

        .related-term {
          font-size: 0.7rem;
          color: var(--text-muted);
          background: var(--bg-subtle);
          border: 1px solid var(--border);
          padding: 2px 6px;
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .glossary-row { grid-template-columns: 1fr; gap: 6px; }
        }
      `}</style>
    </div>
  );
}

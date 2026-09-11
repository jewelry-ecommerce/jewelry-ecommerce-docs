import Link from 'next/link';
import { project } from '@/content/project';
import { epics } from '@/content/epics';
import { allStories } from '@/content/stories';
import { getEpicIcon } from '@/lib/utils';

export const dynamic = 'force-static';

export default function HomePage() {
  const mustStories = allStories.filter((s) => s.priority === 'MUST').length;
  const shouldStories = allStories.filter((s) => s.priority === 'SHOULD').length;
  const niceStories = allStories.filter((s) => s.priority === 'NICE').length;

  return (
    <div className="home-page animate-fade-in">
      {/* ---- Hero ---- */}
      <section className="hero">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Graduation Project 2026
        </div>
        <h1 className="hero-title">
          Jewelry Commerce
          <span className="hero-gradient"> Documentation</span>
        </h1>
        <p className="hero-desc">
          Tài liệu BA/User Story đầy đủ cho đồ án thương mại điện tử trang sức — 10 Epics, 54 User
          Stories, AI Jewelry Stylist và Smart Set Builder.
        </p>
        <div className="hero-actions">
          <Link href="/backlog" className="btn-primary">
            Xem Backlog
          </Link>
          <Link href="/epics/ep-01" className="btn-secondary">
            Đọc User Stories
          </Link>
        </div>
      </section>

      {/* ---- Stats ---- */}
      <section className="stats-row">
        {[
          { label: 'Epics', value: epics.length, sub: 'Domain areas' },
          { label: 'Total Stories', value: allStories.length, sub: 'User Stories' },
          { label: 'MUST', value: mustStories, sub: 'Core features' },
          { label: 'SHOULD', value: shouldStories, sub: 'Important' },
          { label: 'NICE', value: niceStories, sub: 'If time allows' },
        ].map((stat) => (
          <div key={stat.label} className="stat-card surface">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-sub">{stat.sub}</div>
          </div>
        ))}
      </section>

      {/* ---- Team ---- */}
      <section className="section">
        <h2 className="section-title">Team & Phân công</h2>
        <div className="team-grid">
          {project.team.map((member, i) => (
            <div key={i} className="team-card surface">
              <div className="team-avatar">{member.name.charAt(0).toUpperCase()}</div>
              <div>
                <div className="team-name">{member.name}</div>
                <div className="team-role">{member.role}</div>
              </div>
              <ul className="team-resp">
                {member.responsibilities.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Flagship ---- */}
      <section className="section">
        <h2 className="section-title">Flagship Features</h2>
        <div className="flagship-grid">
          <div className="flagship-card flagship-ai">
            <div className="flagship-emoji">🤖</div>
            <div>
              <div className="flagship-name">AI Jewelry Stylist</div>
              <div className="flagship-desc">
                LLM-powered gợi ý trang sức theo dịp, phong cách và ngân sách. Response ≤3 giây với
                fallback rule-based.
              </div>
              <Link href="/epics/ep-05" className="flagship-link">
                Xem EP-05 →
              </Link>
            </div>
          </div>
          <div className="flagship-card flagship-set">
            <div className="flagship-emoji">💎</div>
            <div>
              <div className="flagship-name">Smart Set Builder</div>
              <div className="flagship-desc">
                Tự tổng hợp bộ trang sức từ gợi ý AI, thêm/bỏ từng item, tổng giá cập nhật
                real-time.
              </div>
              <Link href="/epics/ep-05#us-ai-04" className="flagship-link">
                Xem US-AI-04 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Epics Overview ---- */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">10 Epics</h2>
          <Link href="/epics" className="section-link">
            Xem tất cả →
          </Link>
        </div>
        <div className="epics-grid">
          {epics.map((epic) => (
            <Link key={epic.id} href={`/epics/${epic.id.toLowerCase()}`} className="epic-card surface">
              <div className="epic-card-header">
                <span className="epic-icon">{getEpicIcon(epic.id)}</span>
                <span className="epic-id gold-text">{epic.id}</span>
                <span className="epic-story-count">{epic.storyIds.length} stories</span>
              </div>
              <div className="epic-title">{epic.title}</div>
              <div className="epic-goal">{epic.goal}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ---- Reading order ---- */}
      <section className="section">
        <h2 className="section-title">Thứ tự đọc gợi ý</h2>
        <div className="reading-order">
          {project.readingOrder.map((item, i) => (
            <Link key={item.href} href={item.href} className="reading-item surface">
              <div className="reading-num">{String(i + 1).padStart(2, '0')}</div>
              <div>
                <div className="reading-label">{item.label}</div>
                <div className="reading-desc">{item.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <style>{`
        .home-page { display: flex; flex-direction: column; gap: 40px; padding-bottom: 60px; }

        /* Hero */
        .hero { text-align: center; padding: 40px 0 20px; }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          background: var(--gold-50);
          border: 1px solid var(--gold-200);
          border-radius: 9999px;
          font-size: 0.8rem;
          color: var(--gold-700);
          font-weight: 500;
          margin-bottom: 16px;
        }
        .dark .hero-badge {
          background: color-mix(in srgb, var(--gold-700) 15%, transparent);
          border-color: color-mix(in srgb, var(--gold-500) 30%, transparent);
          color: var(--gold-400);
        }

        .hero-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gold-500);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .hero-title {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }

        .hero-gradient {
          background: linear-gradient(135deg, var(--gold-500), var(--violet-500));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-desc {
          max-width: 600px;
          margin: 0 auto 24px;
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.7;
        }

        .hero-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          padding: 10px 24px;
          background: var(--gold-600);
          color: white;
          border-radius: var(--radius-md);
          font-weight: 500;
          font-size: 0.9rem;
          transition: background 0.15s, transform 0.1s;
          text-decoration: none;
        }
        .btn-primary:hover { background: var(--gold-700); transform: translateY(-1px); text-decoration: none; }

        .btn-secondary {
          padding: 10px 24px;
          background: var(--bg-subtle);
          color: var(--text-primary);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          font-weight: 500;
          font-size: 0.9rem;
          transition: background 0.15s;
          text-decoration: none;
        }
        .btn-secondary:hover { background: var(--bg-muted); text-decoration: none; }

        /* Stats */
        .stats-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .stat-card {
          flex: 1;
          min-width: 100px;
          padding: 16px;
          text-align: center;
          border-radius: var(--radius-lg);
        }

        .stat-value {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--gold-600);
          line-height: 1;
          margin-bottom: 4px;
        }
        .dark .stat-value { color: var(--gold-400); }

        .stat-label { font-size: 0.875rem; font-weight: 600; color: var(--text-primary); }
        .stat-sub { font-size: 0.75rem; color: var(--text-muted); }

        /* Sections */
        .section { display: flex; flex-direction: column; gap: 16px; }
        .section-header { display: flex; align-items: center; justify-content: space-between; }
        .section-title { font-size: 1.125rem; font-weight: 600; }
        .section-link { font-size: 0.875rem; color: var(--gold-600); }
        .dark .section-link { color: var(--gold-400); }

        /* Team */
        .team-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        .team-card {
          padding: 20px;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .team-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, var(--gold-400), var(--gold-600));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 1rem;
        }

        .team-name { font-weight: 600; color: var(--text-primary); }
        .team-role { font-size: 0.8rem; color: var(--gold-600); font-weight: 500; }
        .dark .team-role { color: var(--gold-400); }

        .team-resp {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .team-resp li {
          font-size: 0.8rem;
          color: var(--text-secondary);
          padding-left: 12px;
          position: relative;
        }

        .team-resp li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: var(--gold-500);
        }

        /* Flagship */
        .flagship-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        .flagship-card {
          padding: 24px;
          border-radius: var(--radius-lg);
          display: flex;
          gap: 16px;
          border: 1px solid;
        }

        .flagship-ai {
          background: linear-gradient(135deg, var(--violet-50), #fff);
          border-color: var(--violet-200);
        }
        .dark .flagship-ai {
          background: color-mix(in srgb, var(--violet-700) 10%, var(--bg-surface));
          border-color: color-mix(in srgb, var(--violet-500) 30%, transparent);
        }

        .flagship-set {
          background: linear-gradient(135deg, var(--gold-50), #fff);
          border-color: var(--gold-200);
        }
        .dark .flagship-set {
          background: color-mix(in srgb, var(--gold-700) 10%, var(--bg-surface));
          border-color: color-mix(in srgb, var(--gold-500) 30%, transparent);
        }

        .flagship-emoji { font-size: 2rem; flex-shrink: 0; }
        .flagship-name { font-weight: 600; color: var(--text-primary); margin-bottom: 6px; }
        .flagship-desc { font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 10px; line-height: 1.5; }
        .flagship-link { font-size: 0.8rem; color: var(--gold-600); font-weight: 500; }
        .dark .flagship-link { color: var(--gold-400); }

        /* Epics */
        .epics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 12px;
        }

        .epic-card {
          padding: 16px;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          gap: 6px;
          text-decoration: none;
          transition: box-shadow 0.15s, transform 0.1s;
        }
        .epic-card:hover { box-shadow: var(--shadow-md); transform: translateY(-1px); text-decoration: none; }

        .epic-card-header { display: flex; align-items: center; gap: 6px; }
        .epic-icon { font-size: 1rem; }
        .epic-id { font-size: 0.75rem; font-weight: 600; }

        .epic-story-count {
          margin-left: auto;
          font-size: 0.7rem;
          color: var(--text-muted);
          background: var(--bg-subtle);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .epic-title { font-size: 0.875rem; font-weight: 600; color: var(--text-primary); }
        .epic-goal { font-size: 0.8rem; color: var(--text-muted); line-height: 1.4; }

        /* Reading order */
        .reading-order { display: flex; flex-direction: column; gap: 8px; }

        .reading-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 14px 16px;
          border-radius: var(--radius-md);
          text-decoration: none;
          transition: box-shadow 0.15s;
        }
        .reading-item:hover { box-shadow: var(--shadow-md); text-decoration: none; }

        .reading-num {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--gold-600);
          min-width: 24px;
          margin-top: 2px;
        }
        .dark .reading-num { color: var(--gold-400); }

        .reading-label { font-size: 0.875rem; font-weight: 600; color: var(--text-primary); margin-bottom: 2px; }
        .reading-desc { font-size: 0.8rem; color: var(--text-muted); }

        @media (max-width: 768px) {
          .team-grid, .flagship-grid { grid-template-columns: 1fr; }
          .epics-grid { grid-template-columns: 1fr 1fr; }
          .stats-row { gap: 8px; }
        }

        @media (max-width: 480px) {
          .epics-grid { grid-template-columns: 1fr; }
          .hero { padding: 24px 0 12px; }
        }
      `}</style>
    </div>
  );
}

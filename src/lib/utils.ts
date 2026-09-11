import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Priority, StoryStatus, DecisionStatus, PhaseStatus } from '../content/types';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

// ---- Priority helpers ----

export const PRIORITY_LABEL: Record<Priority, string> = {
  MUST: 'MUST',
  SHOULD: 'SHOULD',
  NICE: 'NICE',
};

export const PRIORITY_CSS: Record<Priority, string> = {
  MUST: 'priority-must',
  SHOULD: 'priority-should',
  NICE: 'priority-nice',
};

export const PRIORITY_COLOR: Record<Priority, { bg: string; text: string; border: string }> = {
  MUST: {
    bg: 'var(--priority-must-bg)',
    text: 'var(--priority-must)',
    border: 'var(--priority-must-border)',
  },
  SHOULD: {
    bg: 'var(--priority-should-bg)',
    text: 'var(--priority-should)',
    border: 'var(--priority-should-border)',
  },
  NICE: {
    bg: 'var(--priority-nice-bg)',
    text: 'var(--priority-nice)',
    border: 'var(--priority-nice-border)',
  },
};

// ---- Status helpers ----

export const STATUS_LABEL: Record<StoryStatus, string> = {
  DRAFT: 'Draft',
  READY: 'Ready',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
};

export const STATUS_COLOR: Record<StoryStatus, { bg: string; text: string }> = {
  DRAFT: { bg: 'var(--status-draft-bg)', text: 'var(--status-draft)' },
  READY: { bg: 'var(--status-ready-bg)', text: 'var(--status-ready)' },
  IN_PROGRESS: { bg: 'var(--status-inprogress-bg)', text: 'var(--status-inprogress)' },
  DONE: { bg: 'var(--status-done-bg)', text: 'var(--status-done)' },
};

export const DECISION_STATUS_LABEL: Record<DecisionStatus, string> = {
  ACCEPTED: 'Accepted',
  OPEN: 'Open',
  SUPERSEDED: 'Superseded',
};

export const PHASE_STATUS_LABEL: Record<PhaseStatus, string> = {
  UPCOMING: 'Upcoming',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
};

// ---- Epic helpers ----

export const EPIC_ICON: Record<string, string> = {
  'EP-01': '👤',
  'EP-02': '🛍️',
  'EP-03': '🏪',
  'EP-04': '💎',
  'EP-05': '🤖',
  'EP-06': '🛒',
  'EP-07': '🏷️',
  'EP-08': '💳',
  'EP-09': '📦',
  'EP-10': '⚙️',
};

export function getEpicIcon(epicId: string): string {
  return EPIC_ICON[epicId] ?? '📋';
}

// ---- String helpers ----

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function highlightText(text: string, query: string): string {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>');
}

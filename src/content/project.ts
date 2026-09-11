import type { ProjectMetadata } from './types';

export const project: ProjectMetadata = {
  name: 'Jewelry Commerce',
  description: 'Graduation Project',
  version: '1.0.0',
  lastUpdated: '2026-09-11',
  team: [
    {
      name: 'FE',
      role: 'Frontend',
      responsibilities: ['Web App'],
    },
    {
      name: 'BE',
      role: 'Backend',
      responsibilities: ['API', 'Database'],
    },
  ],
  readingOrder: [
    {
      label: 'Read Epics',
      description: 'Start here',
      href: '/epics',
    },
  ],
};

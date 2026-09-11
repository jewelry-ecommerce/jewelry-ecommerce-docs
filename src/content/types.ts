export type Priority = 'MUST' | 'SHOULD' | 'NICE';
export type StoryStatus = 'DRAFT' | 'READY' | 'IN_PROGRESS' | 'DONE';
export type DecisionStatus = 'ACCEPTED' | 'OPEN' | 'SUPERSEDED';
export type PhaseStatus = 'UPCOMING' | 'IN_PROGRESS' | 'DONE';
export type Owner = 'FE' | 'BE' | 'Both';

export interface Epic {
  id: string;
  title: string;
  goal: string;
  description: string;
  businessValue: string;
  storyIds: string[];
  dependencies: string[];
  successCriteria: string[];
  outOfScope: string[];
}

export interface UserStory {
  id: string;
  epicId: string;
  title: string;
  priority: Priority;
  status: StoryStatus;
  owner: Owner;
  actor: string;
  userStory: string;
  objective: string;
  mainFlow: string[];
  businessRules: {
    id: string;
    text: string;
    group?: string;
  }[];
  acceptanceCriteria: {
    id: string;
    given: string;
    when: string;
    then: string;
  }[];
  edgeCases: string[];
  outOfScope: string[];
  dependencies: string[];
  notes: string[];
}

export interface ProjectMetadata {
  name: string;
  description: string;
  version: string;
  lastUpdated: string;
  team: {
    name: string;
    role: string;
    responsibilities: string[];
  }[];
  readingOrder: {
    label: string;
    description: string;
    href: string;
  }[];
}

export interface SearchResult {
  type: 'epic' | 'story' | 'rule' | 'flow' | 'decision' | 'glossary';
  id: string;
  title: string;
  subtitle?: string;
  snippet?: string;
  href: string;
}

export interface GlobalBusinessRule {
  id: string;
  group: string;
  title: string;
  description: string;
  relatedStories?: string[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  relatedTerms?: string[];
}

export interface CustomerFlow {
  id: string;
  title: string;
  description: string;
  actors: string[];
  steps: {
    step: number;
    actor: string;
    action: string;
    systemResponse?: string;
    notes?: string;
  }[];
  relatedStories: string[];
  notes?: string[];
}

export interface Decision {
  id: string;
  title: string;
  context: string;
  options: string[];
  decision: string;
  rationale: string;
  consequences: string[];
  owner: string;
  date: string;
  dueDate?: string;
  status: DecisionStatus;
  relatedStories: string[];
}

export interface RoadmapPhase {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  goal: string;
  relatedEpics: string[];
  milestones: {
    date: string;
    name: string;
    deliverables: string[];
  }[];
  deliverables: string[];
  status: PhaseStatus;
  isConfirmed: boolean;
}

import { storiesEP01 } from "./ep01";
import { storiesEP02 } from "./ep02";
import { storiesEP03 } from "./ep03";
import { storiesEP04, storiesEP05, storiesEP06 } from "./ep04-06";
import { storiesEP07, storiesEP08, storiesEP09, storiesEP10 } from "./ep07-10";
import type { UserStory } from "../types";

export const allStories: UserStory[] = [
  ...storiesEP01,
  ...storiesEP02,
  ...storiesEP03,
  ...storiesEP04,
  ...storiesEP05,
  ...storiesEP06,
  ...storiesEP07,
  ...storiesEP08,
  ...storiesEP09,
  ...storiesEP10,
];

export const getStoryById = (id: string): UserStory | undefined =>
  allStories.find((s) => s.id === id);

export const getStoriesByEpic = (epicId: string): UserStory[] =>
  allStories.filter((s) => s.epicId === epicId);

export const getAdjacentStories = (
  storyId: string,
): {
  prev: UserStory | null;
  next: UserStory | null;
  index: number;
  total: number;
} => {
  const story = getStoryById(storyId);
  if (!story) return { prev: null, next: null, index: -1, total: 0 };

  const epicStories = getStoriesByEpic(story.epicId);
  const idx = epicStories.findIndex((s) => s.id === storyId);

  return {
    prev: idx > 0 ? (epicStories[idx - 1] ?? null) : null,
    next: idx < epicStories.length - 1 ? (epicStories[idx + 1] ?? null) : null,
    index: idx + 1,
    total: epicStories.length,
  };
};

export {
  storiesEP01,
  storiesEP02,
  storiesEP03,
  storiesEP04,
  storiesEP05,
  storiesEP06,
  storiesEP07,
  storiesEP08,
  storiesEP09,
  storiesEP10,
};

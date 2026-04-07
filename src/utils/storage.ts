import type { SavedResult } from '../types';

const STORAGE_KEY = 'mago-seminar-result';

export function saveResult(result: SavedResult): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  } catch {
    // storage quota exceeded or unavailable
  }
}

export function getResult(): SavedResult | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as SavedResult;
    if (!data.nickname || !data.resultKey || !data.scores || !data.answers) {
      clearResult();
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export function clearResult(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // unavailable
  }
}

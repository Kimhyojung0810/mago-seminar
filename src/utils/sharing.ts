import type { ResultType, Scores } from '../types';
import { determineType } from './scoring';

export interface ParsedShare {
  nickname: string;
  resultKey: ResultType;
  scores: Scores;
}

export function buildShareURL(
  nickname: string,
  resultKey: ResultType,
  scores: Scores,
): string {
  const params = new URLSearchParams({
    n: nickname,
    t: resultKey,
    a: String(scores.A),
    b: String(scores.B),
    c: String(scores.C),
  });
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

const VALID_TYPES: ResultType[] = ['tiger', 'puppy', 'fox', 'penguin'];

export function parseShareURL(): ParsedShare | null {
  const p = new URLSearchParams(window.location.search);
  const n = p.get('n');
  const a = Number(p.get('a'));
  const b = Number(p.get('b'));
  const c = Number(p.get('c'));
  const t = p.get('t') as ResultType | null;

  if (!n || isNaN(a) || isNaN(b) || isNaN(c)) return null;

  const scores: Scores = { A: a, B: b, C: c };
  const resultKey = t && VALID_TYPES.includes(t) ? t : determineType(scores);

  return { nickname: n, resultKey, scores };
}

export function clearShareParams(): void {
  window.history.replaceState({}, '', window.location.pathname);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fall through
    }
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;left:-9999px';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    return true;
  } catch {
    return false;
  }
}

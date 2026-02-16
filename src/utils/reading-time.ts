const WORDS_PER_MINUTE = 200;

export function calculateReadingTime(content: string): number {
  const text = content.trim();
  if (!text) return 0;

  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);

  return Math.max(1, minutes);
}

export function getWordCount(content: string): number {
  const text = content.trim();
  if (!text) return 0;

  return text.split(/\s+/).filter(Boolean).length;
}

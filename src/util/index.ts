export function scrambleText(text: string): string {
  return text
    .split(' ')
    .map(word => {
      if (word.length <= 2) return word;

      const first = word[0];
      const middle = word.slice(1, -1).split('');
      const last = word[word.length - 1];

      for (let i = middle.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [middle[i], middle[j]] = [middle[j], middle[i]];
      }

      return first + middle.join('') + last;
    })
    .join(' ');
}

export const addPlural = (value: number, word: string) =>
  `${word}${value === 1 ? '' : 's'}`;

export function getRemainingTime(
  dateStr: string,
  alternativeText = 'agora'
): {
  raw: number;
  d: number;
  h: number;
  m: number;
  s: number;
  text: string;
  expired: boolean;
} {
  const target = new Date(dateStr).getTime();
  const now = Date.now();

  const diff = target - now;

  if (diff <= 0) {
    return {
      raw: 0,
      d: 0,
      h: 0,
      m: 0,
      s: 0,
      text: alternativeText,
      expired: true,
    };
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  let text = '';

  if (d > 0) text = `${d} ${addPlural(d, 'dia')}`;
  else if (h > 0) text = `${h} ${addPlural(h, 'hora')}`;
  else if (m > 0) text = `${m} ${addPlural(m, 'minuto')}`;
  else text = `${s} ${addPlural(s, 'segundo')}`;

  return { raw: diff, d, h, m, s, text, expired: false };
}

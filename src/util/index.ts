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

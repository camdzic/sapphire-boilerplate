export function randomArrayElement<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export function chunkArray<T>(array: T[], size: number) {
  const chunks: T[][] = [];

  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }

  return chunks;
}

export function shuffleArray<T>(array: T[]) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export function getUniqueArrayElements<T>(array: T[]) {
  return [...new Set(array)];
}

export function formatArray(array: string[], conjunction = 'and') {
  if (array.length === 0) {
    return '';
  }

  if (array.length === 1) {
    return array[0];
  }

  if (array.length === 2) {
    return `${array[0]} ${conjunction} ${array[1]}`;
  }

  const lastItem = array[array.length - 1];
  const otherItems = array.slice(0, -1);

  return `${otherItems.join(', ')}, ${conjunction} ${lastItem}`;
}

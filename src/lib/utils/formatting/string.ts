export const invisibleCharacter = '\u200B';

export function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function capitalizeString(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function truncateString(str: string, maxLength: number, suffix = '...') {
  if (str.length <= maxLength) {
    return str;
  }

  return str.slice(0, maxLength - suffix.length) + suffix;
}

export function pluralizeString(str: string, count: number) {
  return count === 1 ? str : `${str}s`;
}

export function extractCustomIdPart(
  customId: string,
  asNumber?: false,
  index?: number
): string;
export function extractCustomIdPart(
  customId: string,
  asNumber?: true,
  index?: number
): number;
export function extractCustomIdPart(
  customId: string,
  asNumber = false,
  index = 0
) {
  const parts = customId.split('.');
  const part = parts[index + 1];

  if (part === undefined) {
    throw new Error(`Custom ID part not found at index ${index}`);
  }

  if (asNumber) {
    const number = Number(part);

    if (Number.isNaN(number)) {
      throw new Error(`Custom ID part at index ${index} is not a valid number`);
    }

    return number;
  }

  return part;
}

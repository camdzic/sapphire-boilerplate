import { type ColorResolvable, resolveColor } from 'discord.js';
import { z } from 'zod';

export const colorResolvableSchema = z.custom<ColorResolvable>((value) => {
  try {
    return Boolean(resolveColor(value));
  } catch {
    return false;
  }
});

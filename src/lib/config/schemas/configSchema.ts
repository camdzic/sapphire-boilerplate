import { z } from 'zod';
import { colorResolvableSchema } from './colorResolvableSchema';

export const configSchema = z.object({
  token: z.string(),
  guildId: z.string(),
  colors: z.object({
    primary: colorResolvableSchema,
    success: colorResolvableSchema,
    error: colorResolvableSchema
  })
});

import { z } from 'zod';
import { colorResolvableSchema } from './colorResolvableSchema';

export const configSchema = z.object({
  colors: z.object({
    primary: colorResolvableSchema,
    success: colorResolvableSchema,
    error: colorResolvableSchema
  })
});

import type { PrismaClient } from '@prisma/client';
import type { z } from 'zod';
import type { configSchema } from '#lib/config/schemas/configSchema';

declare module '@sapphire/pieces' {
  interface Container {
    config: z.infer<typeof configSchema>;

    prisma: PrismaClient;
  }
}

declare module 'bun' {
  interface Env {
    GUILD_ID: string;
  }
}

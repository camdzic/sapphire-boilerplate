import type { PrismaClient } from '@prisma/client';
import type { z } from 'zod';
import type { configSchema } from './lib/config/schemas/configSchema';
import type { CooldownUtility } from './utilities/cooldown';
import type { TimeUtility } from './utilities/time';

declare module '@sapphire/pieces' {
  interface Container {
    config: z.infer<typeof configSchema>;

    prisma: PrismaClient;
  }
}

declare module '@sapphire/plugin-utilities-store' {
  interface Utilities {
    cooldown: CooldownUtility;
    time: TimeUtility;
  }
}

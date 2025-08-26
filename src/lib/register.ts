import '#lib/config/register';

import '@sapphire/plugin-logger/register';
import '@kingsworld/plugin-cron/register';

import { PrismaClient } from '@prisma/client';
import { ApplicationCommandRegistries, container, RegisterBehavior } from '@sapphire/framework';

container.prisma = new PrismaClient();

ApplicationCommandRegistries.setDefaultGuildIds([process.env.GUILD_ID]);
ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.BulkOverwrite);

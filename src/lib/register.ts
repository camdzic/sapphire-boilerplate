import './config/register';

import '@sapphire/plugin-logger/register';
import '@sapphire/plugin-utilities-store/register';
import '@kingsworld/plugin-cron/register';

import { PrismaClient } from '@prisma/client';
import {
  ApplicationCommandRegistries,
  RegisterBehavior,
  container
} from '@sapphire/framework';

container.prisma = new PrismaClient();

ApplicationCommandRegistries.setDefaultGuildIds([container.config.guildId]);
ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(
  RegisterBehavior.BulkOverwrite
);

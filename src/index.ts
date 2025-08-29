import '#lib/register';

import { SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits, Partials } from 'discord.js';

const client = new SapphireClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
  partials: [Partials.User, Partials.GuildMember, Partials.Channel, Partials.Message],
  cronTasks: {
    defaultTimezone: 'Europe/Sarajevo'
  }
});

await client.login();

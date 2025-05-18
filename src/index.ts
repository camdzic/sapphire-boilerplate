import './lib/register';

import { SapphireClient, container } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';

const client = new SapphireClient({
  intents: [GatewayIntentBits.Guilds],
  cronTasks: {
    defaultTimezone: 'Europe/Sarajevo'
  }
});

await client.login(container.config.token);

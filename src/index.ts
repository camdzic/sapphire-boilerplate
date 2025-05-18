import './lib/register';

import { GatewayIntentBits } from 'discord.js';
import { SapphireClient, container } from '@sapphire/framework';

const client = new SapphireClient({
  intents: [GatewayIntentBits.Guilds],
  cronTasks: {
    defaultTimezone: 'Europe/Sarajevo'
  }
});

await client.login(container.config.token);

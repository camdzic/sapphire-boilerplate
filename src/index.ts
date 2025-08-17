import './lib/register';

import { SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';

const client = new SapphireClient({
  intents: [GatewayIntentBits.Guilds],
  cronTasks: {
    defaultTimezone: 'Europe/Sarajevo'
  }
});

await client.login();

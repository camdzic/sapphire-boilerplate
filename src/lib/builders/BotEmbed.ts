import { container } from '@sapphire/framework';
import { EmbedBuilder } from 'discord.js';

// biome-ignore lint:
export class BotEmbed {
  static primary() {
    return new EmbedBuilder().setColor(container.config.colors.primary);
  }

  static success(message: string) {
    return new EmbedBuilder()
      .setColor(container.config.colors.success)
      .setTitle('Success!')
      .setDescription(`✅ ${message}`);
  }

  static error(message: string) {
    return new EmbedBuilder()
      .setColor(container.config.colors.error)
      .setTitle('Error!')
      .setDescription(`❌ ${message}`);
  }
}

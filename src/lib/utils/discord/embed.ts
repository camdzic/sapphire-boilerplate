import { container } from '@sapphire/framework';
import { type ColorResolvable, EmbedBuilder } from 'discord.js';

export function primaryEmbed() {
  return new EmbedBuilder().setColor(container.config.colors.primary);
}

export function baseEmbed(title: string, description: string, color?: ColorResolvable) {
  const embed = primaryEmbed().setTitle(title).setDescription(description);

  if (color) {
    embed.setColor(color);
  }

  return embed;
}

export function successEmbed(message: string, title = 'Success!') {
  return baseEmbed(title, `✅ ${message}`, container.config.colors.success);
}

export function errorEmbed(message: string, title = 'Error!') {
  return baseEmbed(title, `❌ ${message}`, container.config.colors.error);
}

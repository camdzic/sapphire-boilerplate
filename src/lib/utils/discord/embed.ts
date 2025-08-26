import { container } from '@sapphire/framework';
import { EmbedBuilder } from 'discord.js';

export function baseEmbed(
  title: string,
  description: string,
  color = container.config.colors.primary
) {
  return new EmbedBuilder().setTitle(title).setDescription(description).setColor(color);
}

export function primaryEmbed() {
  return new EmbedBuilder().setColor(container.config.colors.primary);
}

export function successEmbed(message: string, title = 'Success!') {
  return baseEmbed(title, `✅ ${message}`, container.config.colors.success);
}

export function errorEmbed(message: string, title = 'Error!') {
  return baseEmbed(title, `❌ ${message}`, container.config.colors.error);
}

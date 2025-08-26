import { container } from '@sapphire/framework';
import { EmbedBuilder } from 'discord.js';

export function createBaseEmbed(
  title: string,
  description: string,
  color = container.config.colors.primary
) {
  return new EmbedBuilder().setTitle(title).setDescription(description).setColor(color);
}

export function createPrimaryEmbed() {
  return new EmbedBuilder().setColor(container.config.colors.primary);
}

export function createSuccessEmbed(message: string, title = 'Success!') {
  return createBaseEmbed(title, `✅ ${message}`, container.config.colors.success);
}

export function createErrorEmbed(message: string, title = 'Error!') {
  return createBaseEmbed(title, `❌ ${message}`, container.config.colors.error);
}

import { ApplyOptions } from '@sapphire/decorators';
import type { ApplicationCommandRegistry } from '@sapphire/framework';
import type { ChatInputCommandInteraction } from 'discord.js';
import { ExtendedCommand } from '#lib/extensions/ExtendedCommand';

@ApplyOptions<ExtendedCommand.Options>({
  description: "Check the bot's latency"
})
export class BotCommand extends ExtendedCommand {
  override registerApplicationCommands(registry: ApplicationCommandRegistry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName(this.name).setDescription(this.description)
    );
  }

  override async chatInputRun(interaction: ChatInputCommandInteraction) {
    const pingInteraction = await interaction.reply({
      content: 'Pong! 🏓',
      withResponse: true
    });

    if (pingInteraction.resource?.message) {
      return interaction.editReply({
        content: `Bot Latency: ${pingInteraction.resource.message.createdTimestamp - interaction.createdTimestamp}ms\nWebSocket Latency: ${Math.round(
          this.container.client.ws.ping
        )}ms`
      });
    }
  }
}

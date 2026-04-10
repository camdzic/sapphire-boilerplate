import { ApplyOptions } from '@sapphire/decorators';
import type {
  ApplicationCommandRegistry,
  ChatInputCommand
} from '@sapphire/framework';
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

  override async chatInputRun(
    interaction: ChatInputCommand.Interaction<'cached'>
  ) {
    const pingInteraction = await interaction.reply({
      content: 'Pong! 🏓',
      withResponse: true
    });

    if (!pingInteraction.resource?.message) {
      return interaction.editReply({
        content: 'Failed to get ping information'
      });
    }

    const botLatency =
      pingInteraction.resource.message.createdTimestamp -
      interaction.createdTimestamp;
    const wsLatency = Math.round(this.container.client.ws.ping);

    return interaction.editReply({
      content: `Bot Latency: ${botLatency}ms\nWebSocket Latency: ${wsLatency}ms`
    });
  }
}

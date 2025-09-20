import { ApplyOptions } from '@sapphire/decorators';
import { Precondition } from '@sapphire/framework';
import type { ChatInputCommandInteraction } from 'discord.js';

@ApplyOptions<Precondition.Options>({
  position: 20
})
export class BotPrecondition extends Precondition {
  override chatInputRun(interaction: ChatInputCommandInteraction) {
    if (!interaction.inCachedGuild()) {
      return this.error({
        message: 'This command can only be used in a cached guild.'
      });
    }

    return this.ok();
  }
}

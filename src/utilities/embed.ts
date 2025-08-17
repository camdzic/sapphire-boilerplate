import { ApplyOptions } from '@sapphire/decorators';
import { Utility } from '@sapphire/plugin-utilities-store';
import { EmbedBuilder } from 'discord.js';

@ApplyOptions<Utility.Options>({})
export class EmbedUtility extends Utility {
  private readonly colors = this.container.config.colors;

  base(title: string, description: string, color = this.colors.primary) {
    return new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor(color);
  }

  primary() {
    return new EmbedBuilder().setColor(this.colors.primary);
  }

  success(message: string, title = 'Success!') {
    return this.base(title, `✅ ${message}`, this.colors.success);
  }

  error(message: string, title = 'Error!') {
    return this.base(title, `❌ ${message}`, this.colors.error);
  }
}

import { ApplyOptions } from '@sapphire/decorators';
import {
  type Events,
  Listener,
  type StoreRegistryValue
} from '@sapphire/framework';
import { blue, gray } from 'colorette';
import { getGuild, getMembers } from '#lib/utils';

@ApplyOptions<Listener.Options>({ once: true })
export class BotListener extends Listener<typeof Events.ClientReady> {
  override async run() {
    this.setupErrorHandling();

    await this.fetchMainGuildMembers();

    this.printStoreDebugInformation();
  }

  private setupErrorHandling() {
    const logError = this.container.logger.error.bind(this.container.logger);

    process.on('unhandledRejection', logError);
    process.on('uncaughtException', logError);
  }

  private async fetchMainGuildMembers() {
    const mainGuild = await getGuild();

    if (!mainGuild) {
      this.container.logger.error('Main guild not found');

      process.exit(1);
    }

    const members = await getMembers();

    this.container.logger.info(
      `Fetched ${members.length} members from the main guild`
    );
  }

  private printStoreDebugInformation() {
    const stores = Array.from(this.container.stores.values());

    for (let i = 0; i < stores.length; i++) {
      const isLastStore = i === stores.length - 1;

      this.container.logger.info(this.styleStore(stores[i], isLastStore));
    }
  }

  private styleStore(store: StoreRegistryValue, isLastStore: boolean) {
    let storePieceCount = 0;

    for (const piece of store.values()) {
      if (!piece.location.virtual) {
        storePieceCount++;
      }
    }

    const prettyStorePieceCount = storePieceCount.toString().padEnd(3, ' ');

    return gray(
      `${isLastStore ? '└─' : '├─'} Loaded ${blue(prettyStorePieceCount)} ${store.name}.`
    );
  }
}

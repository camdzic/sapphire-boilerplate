import { blue, white } from 'colorette';
import { ApplyOptions } from '@sapphire/decorators';
import { Events, Listener, StoreRegistryValue } from '@sapphire/framework';

@ApplyOptions<Listener.Options>({ once: true })
export class ClientReadyListener extends Listener<typeof Events.ClientReady> {
  override run() {
    this.printStoreDebugInformation();
  }

  private printStoreDebugInformation() {
    const { client, logger } = this.container;

    const stores = [...client.stores.values()];
    const last = stores.pop()!;

    for (const store of stores) {
      logger.info(this.styleStore(store, false));
    }
    logger.info(this.styleStore(last, true));
  }

  private styleStore(store: StoreRegistryValue, last: boolean) {
    return white(
      `${last ? '└─' : '├─'} Loaded ${blue(store.size.toString().padEnd(3, ' '))} ${store.name}.`
    );
  }
}

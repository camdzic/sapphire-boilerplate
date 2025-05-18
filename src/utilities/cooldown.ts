import { Utility } from '@sapphire/plugin-utilities-store';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<Utility.Options>({})
export class CooldownUtility extends Utility {
  async create(key: string, duration: number) {
    const nowDate = new Date().getTime();
    const expiresAt = new Date(nowDate + duration);

    await this.container.prisma.cooldown.upsert({
      where: { key },
      create: { key, expiresAt },
      update: { expiresAt }
    });
  }

  async get(key: string) {
    const cooldownDoc = await this.container.prisma.cooldown.findUnique({
      where: { key }
    });

    if (!cooldownDoc) {
      return {
        remainingTime: null,
        prettyRemainingTime: null
      };
    }

    const nowDate = new Date().getTime();
    const remainingTime = cooldownDoc.expiresAt.getTime() - nowDate;

    if (remainingTime > 0) {
      return {
        remainingTime,
        prettyRemainingTime:
          this.container.utilities.time.formatMs(remainingTime)
      };
    }

    await this.container.prisma.cooldown.delete({ where: { key } });

    return {
      remainingTime: null,
      prettyRemainingTime: null
    };
  }
}

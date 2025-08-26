import { container } from '@sapphire/framework';
import { formatMs } from '../formatting/time';

export async function createCooldown(key: string, duration: number) {
  const nowDate = Date.now();
  const expiresAt = new Date(nowDate + duration);

  await container.prisma.cooldown.upsert({
    where: { key },
    create: { key, expiresAt },
    update: { expiresAt }
  });
}

export async function checkCooldown(key: string) {
  const cooldownDoc = await container.prisma.cooldown.findUnique({
    where: { key }
  });

  if (!cooldownDoc) {
    return {
      remainingTime: null,
      prettyRemainingTime: null
    };
  }

  const nowDate = Date.now();
  const remainingTime = cooldownDoc.expiresAt.getTime() - nowDate;

  if (remainingTime > 0) {
    return {
      remainingTime,
      prettyRemainingTime: formatMs(remainingTime)
    };
  }

  await container.prisma.cooldown.delete({ where: { key } });

  return {
    remainingTime: null,
    prettyRemainingTime: null
  };
}

import { container } from '@sapphire/framework';

export async function getGuild(guildId = process.env.GUILD_ID) {
  try {
    return await container.client.guilds.fetch(guildId);
  } catch {
    return null;
  }
}

export async function getChannel(channelId: string) {
  try {
    return await container.client.channels.fetch(channelId);
  } catch {
    return null;
  }
}

export async function getTextBasedChannel(channelId: string) {
  const channel = await getChannel(channelId);

  if (!channel || !channel.isTextBased()) {
    return null;
  }

  return channel;
}

export async function getVoiceBasedChannel(channelId: string) {
  const channel = await getChannel(channelId);

  if (!channel || !channel.isVoiceBased()) {
    return null;
  }

  return channel;
}

export async function getDMBasedChannel(channelId: string) {
  const channel = await getChannel(channelId);

  if (!channel || !channel.isDMBased()) {
    return null;
  }

  return channel;
}

export async function getSendableChannel(channelId: string) {
  const channel = await getChannel(channelId);

  if (!channel || !channel.isSendable()) {
    return null;
  }

  return channel;
}

export async function getRole(roleId: string, guildId = process.env.GUILD_ID) {
  try {
    const guild = await getGuild(guildId);

    if (!guild) {
      return null;
    }

    return await guild.roles.fetch(roleId);
  } catch {
    return null;
  }
}

export async function getUser(userId: string) {
  try {
    return await container.client.users.fetch(userId);
  } catch {
    return null;
  }
}

export async function getMember(
  userId: string,
  guildId = process.env.GUILD_ID
) {
  try {
    const guild = await getGuild(guildId);

    if (!guild) {
      return null;
    }

    return await guild.members.fetch(userId);
  } catch {
    return null;
  }
}

export async function getMessage(channelId: string, messageId: string) {
  try {
    const channel = await getTextBasedChannel(channelId);

    if (!channel) {
      return null;
    }

    return await channel.messages.fetch(messageId);
  } catch {
    return null;
  }
}

export async function getMembers(guildId = process.env.GUILD_ID) {
  try {
    const guild = await getGuild(guildId);

    if (!guild) {
      return [];
    }

    const members = await guild.members.fetch();

    return Array.from(members.values());
  } catch {
    return [];
  }
}

export async function getRoles(guildId = process.env.GUILD_ID) {
  try {
    const guild = await getGuild(guildId);

    if (!guild) {
      return [];
    }

    const roles = await guild.roles.fetch();

    return Array.from(roles.values());
  } catch {
    return [];
  }
}

import {
  ActionRowBuilder,
  ButtonBuilder,
  type ButtonComponentData,
  ChannelSelectMenuBuilder,
  type ChannelSelectMenuComponentData,
  MentionableSelectMenuBuilder,
  type MentionableSelectMenuComponentData,
  type MessageActionRowComponentBuilder,
  type ModalActionRowComponentBuilder,
  ModalBuilder,
  RoleSelectMenuBuilder,
  type RoleSelectMenuComponentData,
  StringSelectMenuBuilder,
  type StringSelectMenuComponentData,
  TextInputBuilder,
  type TextInputComponentData,
  UserSelectMenuBuilder,
  type UserSelectMenuComponentData
} from 'discord.js';

export function baseActionRow() {
  return new ActionRowBuilder<MessageActionRowComponentBuilder>();
}

export function button(...buttons: Partial<ButtonComponentData>[]) {
  const actionRow = baseActionRow();

  for (const button of buttons) {
    const buttonBuilder = new ButtonBuilder(button);

    actionRow.addComponents(buttonBuilder);
  }

  return actionRow;
}

export function selectMenu(
  type: 'string',
  ...selectMenus: Partial<StringSelectMenuComponentData>[]
): ActionRowBuilder<MessageActionRowComponentBuilder>;
export function selectMenu(
  type: 'user',
  ...selectMenus: Partial<UserSelectMenuComponentData>[]
): ActionRowBuilder<MessageActionRowComponentBuilder>;
export function selectMenu(
  type: 'channel',
  ...selectMenus: Partial<ChannelSelectMenuComponentData>[]
): ActionRowBuilder<MessageActionRowComponentBuilder>;
export function selectMenu(
  type: 'role',
  ...selectMenus: Partial<RoleSelectMenuComponentData>[]
): ActionRowBuilder<MessageActionRowComponentBuilder>;
export function selectMenu(
  type: 'mentionable',
  ...selectMenus: Partial<MentionableSelectMenuComponentData>[]
): ActionRowBuilder<MessageActionRowComponentBuilder>;
export function selectMenu(
  type: 'string' | 'user' | 'channel' | 'role' | 'mentionable',
  ...selectMenus: (
    | Partial<StringSelectMenuComponentData>
    | Partial<UserSelectMenuComponentData>
    | Partial<ChannelSelectMenuComponentData>
    | Partial<RoleSelectMenuComponentData>
    | Partial<MentionableSelectMenuComponentData>
  )[]
) {
  const actionRow = baseActionRow();

  for (const selectMenu of selectMenus) {
    const selectMenuInstance = createSelectMenu(type, selectMenu);

    actionRow.addComponents(selectMenuInstance);
  }

  return actionRow;
}

function createSelectMenu(
  type: 'string' | 'user' | 'channel' | 'role' | 'mentionable',
  selectMenu:
    | Partial<StringSelectMenuComponentData>
    | Partial<UserSelectMenuComponentData>
    | Partial<ChannelSelectMenuComponentData>
    | Partial<RoleSelectMenuComponentData>
    | Partial<MentionableSelectMenuComponentData>
) {
  switch (type) {
    case 'string':
      return new StringSelectMenuBuilder(selectMenu as Partial<StringSelectMenuComponentData>);
    case 'user':
      return new UserSelectMenuBuilder(selectMenu as Partial<UserSelectMenuComponentData>);
    case 'channel':
      return new ChannelSelectMenuBuilder(selectMenu as Partial<ChannelSelectMenuComponentData>);
    case 'role':
      return new RoleSelectMenuBuilder(selectMenu as Partial<RoleSelectMenuComponentData>);
    case 'mentionable':
      return new MentionableSelectMenuBuilder(
        selectMenu as Partial<MentionableSelectMenuComponentData>
      );
  }
}

export function baseModalActionRow() {
  return new ActionRowBuilder<ModalActionRowComponentBuilder>();
}

export function modal(
  title: string,
  customId: string,
  ...textInputs: Partial<TextInputComponentData>[]
) {
  const modalBuilder = new ModalBuilder().setCustomId(customId).setTitle(title);

  for (const textInput of textInputs) {
    const textInputBuilder = new TextInputBuilder(textInput);

    const actionRow = baseModalActionRow().addComponents(textInputBuilder);

    modalBuilder.addComponents(actionRow);
  }

  return modalBuilder;
}

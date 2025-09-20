import {
  type AliasPiece,
  type ApplicationCommandRegistry,
  type Awaitable,
  type ChatInputCommand,
  Command,
  type CommandJSON,
  type CommandOptions,
  type CommandOptionsRunType,
  type CommandRunInUnion,
  type CommandSpecificRunIn
} from '@sapphire/framework';

export class ExtendedCommand extends Command {
  override chatInputRun?(
    interaction: ChatInputCommand.Interaction,
    context: ChatInputCommand.RunContext
  ): Awaitable<unknown>;
}

export namespace ExtendedCommand {
  export type Options = CommandOptions;
  export type JSON = CommandJSON;
  export type LoaderContext = AliasPiece.LoaderContext<'commands'>;
  export type RunInTypes = CommandOptionsRunType;
  export type RunInUnion = CommandRunInUnion;
  export type SpecificRunIn = CommandSpecificRunIn;
  export type Registry = ApplicationCommandRegistry;
}

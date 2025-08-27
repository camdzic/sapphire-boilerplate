# Sapphire Discord Bot Development Guide

## Architecture Overview

This is a **Sapphire Framework** Discord bot using TypeScript with a modular utility system. The bot follows Sapphire's dependency injection pattern through the `container` system.

### Core Components

- **Entry Point**: `src/index.ts` - Minimal client setup with cron tasks support
- **Registration**: `src/lib/register.ts` - Configures Prisma, plugins, and command registration
- **Configuration**: Custom config system in `src/lib/config/` with Zod validation and auto-merging
- **Database**: SQLite with Prisma ORM (`prisma/schema.prisma`)
- **Utils**: Categorized utility functions in `src/lib/utils/`

## Development Patterns

### Command Structure
Commands use Sapphire's decorator pattern:
```typescript
@ApplyOptions<Command.Options>({
  description: "Command description"
})
export class BotCommand extends Command {
  override registerApplicationCommands(registry: ApplicationCommandRegistry) {
    // Register slash command
  }
  override async chatInputRun(interaction: ChatInputCommandInteraction) {
    // Handle interaction
  }
}
```

### Configuration System
- Config files live in `config/config.json` with schema validation
- Use `container.config` to access validated config data
- The `Config` class auto-creates missing files and merges defaults with user settings
- All config schemas are in `src/lib/config/schemas/`

### Container Dependencies
Access shared services via `container`:
- `container.config` - Validated configuration data
- `container.prisma` - Prisma database client
- `container.logger` - Sapphire logger
- `container.client` - Discord.js client

### Utility Functions
Utilities are categorized by domain:
- **Database**: `createCooldown()`, `checkCooldown()` for user rate limiting
- **Discord**: `baseEmbed()`, `successEmbed()`, `errorEmbed()` for consistent styling
- **Formatting**: Array, number, string, and time utilities for display formatting

### Database Patterns
- Use upsert for cooldowns: `container.prisma.cooldown.upsert()`
- Clean up expired data automatically in utility functions
- Key-based cooldown system using string identifiers

## Development Workflow

### Scripts
- `bun run dev` - Watch mode development
- `bun run start` - Production start
- `bun run biome` - Format and lint code

### Code Style
- **Biome** for formatting/linting (single quotes, 100 char width, semicolons)
- **Lefthook** for git hooks
- Import aliases: `#lib/` for `src/lib/`

### Environment Setup
- Requires `GUILD_ID` environment variable for slash command registration
- Default timezone: `Europe/Sarajevo`

## Key Files to Reference

- `src/global.d.ts` - Type extensions for container and environment
- `src/lib/utils/index.ts` - All utility function exports
- `config/config.json` - Runtime configuration
- `src/lib/config/register.ts` - Shows container setup pattern

## Integration Points

- **Sapphire Framework**: Commands, listeners, dependency injection
- **Discord.js v14**: Guild intents, slash commands, embeds
- **Prisma**: Database ORM with SQLite
- **Zod**: Runtime type validation for config
- **@kingsworld/plugin-cron**: Scheduled tasks support

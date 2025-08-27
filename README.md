# sapphire-boilerplate

A simple boilerplate for the Sapphire framework - a framework for building Discord bots

## Features

- TypeScript
- Biome (formatter and linter)
- Database support (Prisma)
- Configuration system

## Utils

The boilerplate includes several utility modules:

- **Database** (`createCooldown`, `checkCooldown`) - Cooldown management with database persistence
- **Discord** (`baseEmbed`, `primaryEmbed`, `successEmbed`, `errorEmbed`) - Pre-configured Discord embed builders
- **Array** (`randomArrayElement`, `chunkArray`, `shuffleArray`, `getUniqueArrayElements`, `formatArray`) - Array manipulation utilities
- **Number** (`randomNumberBetween`, `formatNumber`, `formatOrdinal`) - Number formatting and generation
- **String** (`toTitleCase`, `capitalizeString`, `truncateString`, `pluralizeString`) - String formatting utilities
- **Time** (`formatMs`, `parseMs`) - Time formatting and parsing using Sapphire duration
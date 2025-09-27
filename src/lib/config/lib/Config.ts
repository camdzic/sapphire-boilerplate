import fs from 'node:fs';
import path from 'node:path';
import { merge } from 'lodash';
import type { ZodSchema } from 'zod';
import { defaultConfigExtension } from '#lib/constants';

export class Config<T> {
  readonly data: T;

  private readonly configPath: string;
  private readonly schema: ZodSchema<T>;
  private readonly defaultConfig: T;
  private readonly fileFormat: 'json' | 'yaml' | 'yml';

  constructor(configPath: string, schema: ZodSchema<T>, defaultConfig: T) {
    this.configPath = this.resolveConfigPath(configPath);

    this.validateConfigPath(this.configPath);

    this.schema = schema;
    this.defaultConfig = defaultConfig;
    this.fileFormat = this.determineFileFormat(this.configPath);

    this.data = this.initializeConfig();
  }

  private resolveConfigPath(configPath: string) {
    const supportedExtensions = ['.json', '.yaml', '.yml'];
    const hasExtension = supportedExtensions.some((ext) => configPath.toLowerCase().endsWith(ext));

    if (!hasExtension) {
      return configPath + defaultConfigExtension;
    }

    return configPath;
  }

  private initializeConfig() {
    this.ensureConfigDirectory();

    if (!this.configFileExists()) {
      return this.createDefaultConfigFile();
    }

    return this.loadAndValidateConfig();
  }

  private ensureConfigDirectory() {
    const configDirectory = path.dirname(this.configPath);

    if (!fs.existsSync(configDirectory)) {
      fs.mkdirSync(configDirectory, { recursive: true });
    }
  }

  private configFileExists() {
    return fs.existsSync(this.configPath);
  }

  private createDefaultConfigFile() {
    try {
      this.writeConfigFile(this.defaultConfig);

      return this.defaultConfig;
    } catch (error) {
      throw new Error(`Failed to create default config file: ${error}`);
    }
  }

  private loadAndValidateConfig() {
    try {
      const existingConfig = this.readConfigFile();
      const mergedConfig = merge({}, this.defaultConfig, existingConfig);
      const validatedConfig = this.validateConfig(mergedConfig);

      this.writeConfigFile(validatedConfig);

      return validatedConfig;
    } catch (error) {
      throw new Error(`Failed to load and validate config: ${error}`);
    }
  }

  private validateConfigPath(configPath: string) {
    if (!configPath || !configPath.trim().length) {
      throw new Error('Config path cannot be empty');
    }

    const supportedExtensions = ['.json', '.yaml', '.yml'];
    const hasValidExtension = supportedExtensions.some((ext) =>
      configPath.toLowerCase().endsWith(ext)
    );

    if (!hasValidExtension) {
      throw new Error('Config file must have .json, .yaml, or .yml extension');
    }

    const invalidChars = /[<>:"|?*]/;
    const hasControlChars = configPath.split('').some((char) => char.charCodeAt(0) < 32);

    if (invalidChars.test(configPath) || hasControlChars) {
      throw new Error('Config path contains invalid characters');
    }

    const fileName = path.basename(configPath);
    const validFileName = supportedExtensions.some((ext) => fileName === ext);

    if (validFileName) {
      throw new Error('Config file must have a name before the extension');
    }

    if (configPath.length > 250) {
      throw new Error('Config path is too long (max 250 characters)');
    }

    if (
      path.basename(configPath) === configPath &&
      !configPath.includes('/') &&
      !configPath.includes('\\')
    ) {
      throw new Error('Config path should include directory structure, not just filename');
    }
  }

  private determineFileFormat(configPath: string) {
    const lowerPath = configPath.toLowerCase();

    if (lowerPath.endsWith('.yaml')) {
      return 'yaml';
    }
    if (lowerPath.endsWith('.yml')) {
      return 'yml';
    }
    if (lowerPath.endsWith('.json')) {
      return 'json';
    }

    throw new Error('Unsupported file format');
  }

  private readConfigFile() {
    try {
      const rawData = fs.readFileSync(this.configPath, 'utf-8');

      switch (this.fileFormat) {
        case 'json':
          return JSON.parse(rawData);
        case 'yaml':
        case 'yml':
          return Bun.YAML.parse(rawData);
      }
    } catch (error) {
      throw new Error(`Failed to read or parse config file at ${this.configPath}: ${error}`);
    }
  }

  private writeConfigFile(config: T) {
    try {
      const formattedConfig = this.formatConfigForFile(config);

      fs.writeFileSync(this.configPath, formattedConfig, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to write config file at ${this.configPath}: ${error}`);
    }
  }

  private formatConfigForFile(config: T) {
    switch (this.fileFormat) {
      case 'json':
        return JSON.stringify(config, null, 2);
      case 'yaml':
      case 'yml':
        return Bun.YAML.stringify(config, null, 2);
    }
  }

  private validateConfig(config: unknown) {
    try {
      return this.schema.parse(config);
    } catch (error) {
      throw new Error(`Config validation failed: ${error}`);
    }
  }
}

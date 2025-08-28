import fs from 'node:fs';
import path from 'node:path';
import { merge } from 'lodash';
import type { ZodSchema } from 'zod';

export class Config<T> {
  private readonly configPath: string;
  private readonly schema: ZodSchema<T>;
  private readonly defaultConfig: T;

  readonly data: T;

  constructor(configPath: string, schema: ZodSchema<T>, defaultConfig: T) {
    this.validateConfigPath(configPath);

    this.configPath = configPath;
    this.schema = schema;
    this.defaultConfig = defaultConfig;

    this.data = this.initializeConfig();
  }

  private validateConfigPath(configPath: string) {
    if (!configPath || !configPath.trim().length) {
      throw new Error('Config path cannot be empty');
    }

    if (!configPath.toLowerCase().endsWith('.json')) {
      throw new Error('Config file must have .json extension');
    }

    const invalidChars = /[<>:"|?*]/;
    const hasControlChars = configPath.split('').some((char) => char.charCodeAt(0) < 32);
    if (invalidChars.test(configPath) || hasControlChars) {
      throw new Error('Config path contains invalid characters');
    }

    const fileName = path.basename(configPath);
    if (fileName === '.json') {
      throw new Error('Config file must have a name before .json extension');
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

  private readConfigFile() {
    try {
      const rawData = fs.readFileSync(this.configPath, 'utf-8');

      return JSON.parse(rawData);
    } catch (error) {
      throw new Error(`Failed to read or parse config file at ${this.configPath}: ${error}`);
    }
  }

  private writeConfigFile(config: T) {
    try {
      const formattedConfig = JSON.stringify(config, null, 2);

      fs.writeFileSync(this.configPath, formattedConfig, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to write config file at ${this.configPath}: ${error}`);
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

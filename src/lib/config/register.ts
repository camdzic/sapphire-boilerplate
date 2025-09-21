import { container } from '@sapphire/framework';
import { Config } from './lib/Config';
import { configSchema } from './schemas/configSchema';

const config = new Config('config/settings', configSchema, {
  colors: {
    primary: '#5865f2',
    success: '#57f287',
    error: '#ed4245'
  }
});

container.config = config.data;

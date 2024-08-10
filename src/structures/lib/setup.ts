import { join } from 'path';
import {
  ApplicationCommandRegistries,
  RegisterBehavior
} from '@sapphire/framework';
import '@sapphire/plugin-logger/register';
import { setup } from '@skyra/env-utilities';
import { rootDir } from './constants';

ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(
  RegisterBehavior.BulkOverwrite
);

setup({ path: join(rootDir, '.env') });

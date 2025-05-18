import { ApplyOptions } from '@sapphire/decorators';
import { Utility } from '@sapphire/plugin-utilities-store';
import { Duration, DurationFormatter } from '@sapphire/duration';

@ApplyOptions<Utility.Options>({})
export class TimeUtility extends Utility {
  formatMs(ms: number, precision?: number) {
    return new DurationFormatter().format(ms, precision, {
      right: ', ',
      final: ' and '
    });
  }

  parseMs(offset: string) {
    return new Duration(offset).offset;
  }
}

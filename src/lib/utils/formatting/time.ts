import { Duration, DurationFormatter, Time } from '@sapphire/duration';

export function formatMs(ms: number, precision?: number) {
  return new DurationFormatter().format(ms, precision, {
    right: ', ',
    final: ' and '
  });
}

export function parseMs(offset: string) {
  return new Duration(offset).offset;
}

export { Time };

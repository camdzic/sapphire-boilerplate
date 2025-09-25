export class Mutex {
  private isAcquired = false;
  private waitingList: Array<() => void> = [];

  acquire() {
    if (!this.isAcquired) {
      this.isAcquired = true;

      return Promise.resolve();
    }

    return new Promise<void>((resolve) => {
      this.waitingList.push(resolve);
    });
  }

  release() {
    if (this.waitingList.length) {
      const next = this.waitingList.shift();

      if (next) {
        next();
      }
    } else {
      this.isAcquired = false;
    }
  }
}

export function createMutex() {
  return new Mutex();
}

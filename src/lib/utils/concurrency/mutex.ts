const lockSet = new Set<string>();
const waitingQueues = new Map<string, Array<() => void>>();

export function createMutex(lockKey: string) {
  return {
    acquire: () => acquireMutex(lockKey),
    release: () => releaseMutex(lockKey)
  };
}

export async function withMutex<T>(lockKey: string, fn: () => Promise<T>) {
  const mutex = createMutex(lockKey);

  await mutex.acquire();

  try {
    await fn();
  } finally {
    mutex.release();
  }
}

function acquireMutex(lockKey: string) {
  if (!lockSet.has(lockKey)) {
    lockSet.add(lockKey);

    return;
  }

  return new Promise<void>((resolve) => {
    if (!waitingQueues.has(lockKey)) {
      waitingQueues.set(lockKey, []);
    }

    const waitingQueue = waitingQueues.get(lockKey);

    if (waitingQueue) {
      waitingQueue.push(resolve);
    }
  });
}

function releaseMutex(lockKey: string) {
  const waitingQueue = waitingQueues.get(lockKey);

  if (!waitingQueue || waitingQueue.length === 0) {
    lockSet.delete(lockKey);
    waitingQueues.delete(lockKey);

    return;
  }

  const nextResolve = waitingQueue.shift();

  if (nextResolve) {
    nextResolve();
  }
}

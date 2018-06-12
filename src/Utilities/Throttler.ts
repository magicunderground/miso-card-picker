import { Semaphore } from 'prex';

export class Throttler {

    private millisecondsBetween: number;

    private lastActionTime = 0;

    private lock = new Semaphore(1);

    constructor(maxAps: number) {
        this.millisecondsBetween = 1000 / maxAps;
    }

    async tryPerformAction(action: Function): Promise<boolean> {
        await this.lock.wait();
        try {
            if (Date.now() - this.lastActionTime > this.millisecondsBetween) {
                this.lastActionTime = Date.now();
                await action();
                return true;
            }

            return false;
        } finally {
            this.lock.release();
        }
    }
}
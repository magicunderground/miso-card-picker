import { AsyncQueue, delay } from 'prex'

/**
 * Class that limits actions to a set rate
 */
export class Throttler {
    private workQueue = new AsyncQueue<Function>()

    /**
     * 
     * @param maxActionsPerSecond The max number of actions to perform a second
     */
    constructor(maxActionsPerSecond: number) {
        this.queueProcessor(1000 / maxActionsPerSecond)
    }

    /**
     * Performs an action delayed to stay below a max rate
     * @param action Action to throttle to calling rate
     * @returns the action result
     */
    perform = <T>(action: () => Promise<T>) => {
        return new Promise<T>(done => {
            this.workQueue.put(() => {
                action().then(done)
            })
        })
    }

    /**
     * Processes enqueued actions in the background
     * @param dequeueDelay The delay between dequeuing work
     */
    private queueProcessor = async (dequeueDelay: number) => {
        while (true) {
            await delay(dequeueDelay)
            let work = await this.workQueue.get()
            work()
        }
    }
}

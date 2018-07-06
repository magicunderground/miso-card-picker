import { CardCompleter } from '../CardCompleter'
import * as Scry from 'scryfall'
import { Throttler } from '../Throttler'

/**
 * Card completer using scryfall
 */
export class ScryCompleter implements CardCompleter {
    private cache = new Map<string, string[]>()
    private throttler: Throttler

    constructor(throttler: Throttler) {
        this.throttler = throttler
    }

    /**
     * Gets a list of cards based on a partial name
     * @param name The partial name of the card
     * @returns A list of cards that contain the partial name
     */
    autocomplete = async (name: string) => {
        if (name == '') {
            return new Array<string>()
        }

        if (this.cache.has(name)) {
            return this.cache.get(name) || new Array<string>()
        }

        return this.throttler.perform(async () => {
            if (!this.cache.has(name)) {
                this.cache.set(name, await Scry.autocomplete(name))
            }

            return this.cache.get(name) || new Array<string>()
        })
    }
}

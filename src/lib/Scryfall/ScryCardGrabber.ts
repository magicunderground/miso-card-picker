import { ICardGrabber } from '../ICardGrabber'
import { ICardInfo } from '../ICardInfo'
import * as Scry from 'scryfall'
import { Throttler } from '../Throttler'

/**
 * Grab card images using scryfall
 */
export class ScryCardGrabber implements ICardGrabber {
    private cache = new Map<string, ICardInfo>()
    private throttler: Throttler

    constructor(throttler: Throttler) {
        this.throttler = throttler
    }

    /**
     * Gets card information
     * @param name Name of the card to retrieve the information on
     */
    getCard = async (name: string) => {
        if (name == '') {
            return {
                name: '',
                img_uri: ''
            }
        }

        if (this.cache.has(name)) {
            return this.cache.get(name) || { name: name, img_uri: '' }
        }

        return this.throttler.perform(async () => {
            if (!this.cache.has(name)) {
                let card = await Scry.getCardByName(name)
                let uri = (card.image_uris) ? card.image_uris.normal : ''

                this.cache.set(name, {
                    name: card.name,
                    img_uri: uri
                })
            }

            return this.cache.get(name) || { name: name, img_uri: '' }
        })
    }
}

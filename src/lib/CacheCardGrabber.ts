import { CardGrabber } from './CardGrabber'
import { Cache } from './utilities/Cache'
import { CardInfo } from './CardInfo'

export class CacheCardGrabber implements CardGrabber {
    private nonCache: CardGrabber
    private cache: Cache<string, CardInfo>

    constructor(nonCache: CardGrabber, cache: Cache<string, CardInfo>) {
        this.nonCache = nonCache
        this.cache = cache
    }

    getCard = async (name: string) => {
        if (await this.cache.has(name)) {
            return await this.cache.get(name) || { name: '', img_uri: '' }
        } else {
            let info = await this.nonCache.getCard(name)
            return await this.cache.put(name, info)
        }
    }
}
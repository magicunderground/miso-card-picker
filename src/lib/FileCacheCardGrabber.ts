import { CardGrabber } from "./CardGrabber";

export class CacheCardGrabber implements CardGrabber {
    private nonCache: CardGrabber

    constructor(nonCache: CardGrabber) {
        this.nonCache = nonCache
    }

    getCard = async (name: string) => {
        return {
            name: 'hello',
            img_uri: ''
        };
    }
}
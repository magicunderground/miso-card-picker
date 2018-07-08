import { ScryCardGrabber } from '../../../src/lib/Scryfall/ScryCardGrabber'
import { Throttler } from '../../../src/lib/Throttler'
import { expect } from 'chai'

describe('when input is empty', () => {
    it('should return empty info', async () => {
        let grabber = new ScryCardGrabber(new Throttler(0))
        let card = await grabber.getCard('')
        expect(card.name).to.eq('')
        expect(card.img_uri).to.be.eq('')
    })
})
import { ScryCompleter } from '../../../src/lib/Scryfall/ScryCompleter'
import { Throttler } from '../../../src/lib/Throttler'
import { expect } from 'chai'

describe('when input is empty', () => {
    it('should return empty array', async () => {
        let completer = new ScryCompleter(new Throttler(0))
        let results = await completer.autocomplete('')
        expect(results.length).to.eq(0)
    })
})
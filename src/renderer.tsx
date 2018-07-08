import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { CardDisplay } from './components/CardDisplay'
import { ScryCompleter } from './lib/Scryfall/ScryCompleter'
import { ScryCardGrabber } from './lib/Scryfall/ScryCardGrabber'
import { Throttler } from './lib/Throttler'
import { CardInfoCache } from './lib/CardInfoCache'
import { CacheCardGrabber } from './lib/CacheCardGrabber'

// Limit scryfall calls to 10 requests per second
let throttler = new Throttler(10)

let completer = new ScryCompleter(throttler)
let scryGrabber = new ScryCardGrabber(throttler)

let cardCache = new CardInfoCache('c:\\temp')
let cardGrabber = new CacheCardGrabber(scryGrabber, cardCache)

ReactDOM.render(
    <CardDisplay autocomplete={completer.autocomplete} getCard={cardGrabber.getCard} />,
    document.getElementById('main')
)

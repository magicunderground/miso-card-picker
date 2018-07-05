import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { CardDisplay } from './components/CardDisplay'
import { ScryCompleter } from './lib/Scryfall/ScryCompleter'
import { ScryCardGrabber } from './lib/Scryfall/ScryCardGrabber'
import { Throttler } from './lib/Throttler'

// Limit scryfall calls to 10 requests per second
let throttler = new Throttler(10)

let completer = new ScryCompleter(throttler)
let cardGrabber = new ScryCardGrabber(throttler)

ReactDOM.render(
    <CardDisplay autocomplete={completer.autocomplete} getCard={cardGrabber.getCard} />,
    document.getElementById('main')
)

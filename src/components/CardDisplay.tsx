import * as React from 'react'
import * as scryfall from 'scryfall'

import { Card } from './Card'
import { CardPickerForm } from './CardPickerForm'

export interface CardDisplayState {
    name: string
    img_uri: string
}

export class CardDisplay extends React.Component<{}, CardDisplayState> {
    constructor(props: any) {
        super(props)
        this.state = {
            name: '',
            img_uri: ''
        }
    }

    displayCard = async (cardName: string) => {
        if (cardName == '') {
            this.setState({
                name: '',
                img_uri: ''
            })
        } else if (cardName != this.state.name) {
            let card = await scryfall.getCardByName(cardName, true)
            if (card.image_uris) {
                this.setState({
                    name: cardName,
                    img_uri: card.image_uris.normal
                })
            }
        }
    }

    render() {
        return(
            <div>
                <CardPickerForm onSubmit={this.displayCard} />
                <Card name={this.state.name} img_uri={this.state.img_uri} />
            </div>
        );
    }
}

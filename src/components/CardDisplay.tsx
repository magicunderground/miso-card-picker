import * as React from 'react'

import { Card } from './Card'
import { CardPickerForm } from './CardPickerForm'
import { CardInfo } from '../lib/CardInfo'

export interface CardDisplayProps {
    getCard: (cardName: string) => Promise<CardInfo>
    autocomplete: (value: string) => Promise<string[]>
    onSubmit?: (card: CardInfo) => Promise<void>
}

export interface CardDisplayState {
    currentCard: CardInfo
}

export class CardDisplay extends React.Component<CardDisplayProps, CardDisplayState> {
    constructor(props: CardDisplayProps) {
        super(props)
        this.state = {
            currentCard: {
                name: '',
                img_uri: ''
            }
        }
    }

    displayCard = async (cardName: string) => {
        let info = await this.props.getCard(cardName)
        this.setState({
            currentCard: info
        })

        if (this.props.onSubmit) {
            this.props.onSubmit(info)
        }
    }

    render() {
        return(
            <div>
                <CardPickerForm onSubmit={this.displayCard} autocomplete={this.props.autocomplete} />
                <Card name={this.state.currentCard.name} img_uri={this.state.currentCard.img_uri} />
            </div>
        )
    }
}

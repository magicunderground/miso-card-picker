import { CardInfo } from './CardInfo'

export interface CardGrabber {
    /**
     * Gets information on a card given the name
     * @param name The name of the card to get info for
     * @returns The card info
     */
    getCard: (name: string) => Promise<CardInfo>
}

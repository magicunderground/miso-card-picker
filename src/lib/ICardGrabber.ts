import { ICardInfo } from './ICardInfo'

export interface ICardGrabber {
    /**
     * Gets information on a card given the name
     * @param name The name of the card to get info for
     * @returns The card info
     */
    getCard: (name: string) => Promise<ICardInfo>
}

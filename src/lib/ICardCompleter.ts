export interface ICardCompleter {
    /**
     * Gets a list of cards that contains the partial name of a card
     * @param name The partial name of a card
     * @returns A list of card names
     */
    autocomplete: (name: string) => Promise<string[]>
}

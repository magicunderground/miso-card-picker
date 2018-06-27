import * as React from 'react';
import * as scryfall from 'scryfall';
import { Semaphore } from 'prex';

export interface CardPickerFormProps {
    onSubmit?: FunctionStringCallback
}

export interface CardPickerFormState {
    cardName: string
    suggestions: string[]
}

export class CardPickerForm extends React.Component<CardPickerFormProps, CardPickerFormState>{
    private lock = new Semaphore(1)
    private lastUpdate = 0

    constructor(props: CardPickerFormProps) {
        super(props)
        this.state = {
            cardName: "",
            suggestions: [],
        }
    }

    handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault()
        if (this.props.onSubmit)
            this.props.onSubmit(this.state.cardName)
    }

    onChange = async (evt: React.FormEvent) => {
        let current = (evt.target as HTMLFormElement).value as string
        await this.lock.wait()
        try {
            if (Date.now() - this.lastUpdate > 100 && current.length > 2) {
                this.lastUpdate = Date.now()
                let names = await scryfall.autocomplete(current)
                this.setState({
                    cardName: current,
                    suggestions: names,
                })
            } else {
                this.setState({
                    cardName: current,
                })
            }
        } finally {
            this.lock.release()
        }
    }

    render() {
        return(
            <div>
                <form action="submit" onSubmit={this.handleSubmit}>
                <input type="text" onChange={this.onChange} list="suggestions" />
                <datalist id="suggestions">
                {this.state.suggestions.map(suggestion => <option>{suggestion}</option>)}
                </datalist>
                <button type="submit">Display Card</button>
                </form>
            </div>
        )
    }
}
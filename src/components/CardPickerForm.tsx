import * as React from 'react'

export interface CardPickerFormProps {
    onSubmit?: (value: string) => void
    autocomplete: (value: string) => Promise<string[]>
}

export interface CardPickerFormState {
    cardName: string
    suggestions: string[]
}

export class CardPickerForm extends React.Component<CardPickerFormProps, CardPickerFormState> {

    constructor(props: any) {
        super(props)
        this.state = {
            cardName: '',
            suggestions: [],
        }
    }

    handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault()
        if (this.props.onSubmit) {
            this.props.onSubmit(this.state.cardName)
        }
    }

    onChange = async (evt: React.FormEvent) => {
        let current = (evt.target as HTMLFormElement).value as string
        let names = await this.props.autocomplete(current)
        this.setState({
            cardName: current,
            suggestions: names,
        })
    }

    render() {
        return(
            <div>
                <form action='submit' onSubmit={this.handleSubmit}>
                <input type='text' onChange={this.onChange} list='suggestions' />
                <datalist id='suggestions'>
                    {this.state.suggestions.map((suggestion, index) => <option key={index}>{suggestion}</option>)}
                </datalist>
                <button type='submit'>Display Card</button>
                </form>
            </div>
        )
    }
}

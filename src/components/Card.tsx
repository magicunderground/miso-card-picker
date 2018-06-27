import * as React from 'react';

export interface CardProps { 
    name: string
    img_uri: string
}

export class Card extends React.Component<CardProps, {}> {
    render() {
        return (
        <div>
            <img src={this.props.img_uri} alt={this.props.name} />
        </div>)
    }
}
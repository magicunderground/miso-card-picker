import * as React from 'react';

export interface CardProps { 
    name: string;
    set: string;
}

export class Card extends React.Component<CardProps, {}> {
    render() {
        return <h1>{this.props.name} from {this.props.set}</h1>;
    }
}
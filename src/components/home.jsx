import React from 'react';
import Cards from './Card';
import Header from './HeaderBar';

class Board extends React.Component{
   
    getDeckNumber = () => {
        return this.Cards.currentDeckState()
    }

    submit = data => {
        this.Cards.submit(data)
    };

    suffle = () => {
        this.Cards.suffles()
    };
    
    sort = () => {
        this.Cards.sorts()
    };

    render() {
        return (
            <div>
                <Header submit={this.submit} getNumber={this.getDeckNumber} suffleCards={this.suffle} sortCards={this.sort}/>
                <Cards ref={(Card) => { this.Cards = Card; }} />
            </div>
        );
    }
}

export default Board;

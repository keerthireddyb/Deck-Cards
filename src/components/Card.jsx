import React from 'react';
import { Header, Grid, Segment, Container } from 'semantic-ui-react';
import shortid from 'shortid';
import * as data from '../Data';
import "../styles/card.css";

class Card extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            deck: [],
            drawn: [],
        }
    }

    componentDidMount() {console.log(data);
        const arrayData = this.state.deck.slice();
        for (let a = 0; a < data.suits.length; a += 1) {
            for (let k = 0; k < data.ranks.length; k += 1) {
                arrayData.push([data.suits[a], data.ranks[k]]);
             }
          }console.log(arrayData);
        this.setState({
            deck: arrayData
        });
    }

    displayCards(suit, rank) {
        let code = suit * 0x10 + rank;
        if (code > 0xFFFF) {
            code -= 0x10000;
            return String.fromCharCode(0xD800 + (code >> 10), 0xDC00 + (code & 0x3FF));
        }
        return String.fromCharCode(code);
    }

    suffles() {
        const arrayvar = this.state.deck.slice()
        this.setState({ deck: [] });
        const ddd = this.suffleArray(arrayvar)
        this.setState({ deck: ddd });
    }

    suffleArray(array) {
        const size = array.length - 1;
        for (let k = size; k > 0; k -= 1) {
            const a = Math.floor((Math.random() * (k + 1)));
            const temp = array[k];
            array[k] = array[a];
            array[a] = temp;
        }
        return array;
    }

    sorts() {
        if (this.state.drawn.length > 1) {
            const arrayvar = this.state.drawn.slice()
            this.setState({ drawn: [] });
            const ddd = this.sortArray(arrayvar)
            this.setState({ drawn: ddd });
        }
    }

    sortArray(array) {
        array.sort((a, b) => {
            console.log(a,b);
            if (a[0].id < b[0].id) {
                return -1;
            } else if (a[0].id > b[0].id) {
                return 1;
            } else {
                if (a[1].id < b[1].id) {
                    return -1;
                } else if (a[1].id > b[1].id) {
                    return 1;
                }
                return 0;
            }
        })
        return array;
    }

    submit(ObjNumber) {
        this.drawnIntoArray(ObjNumber.number);
    }

    drawnIntoArray(numb) {
        let num = numb;
        if (this.state.deck != null && this.state.deck.length > 0
            && num <= this.state.deck.length  ) {
            const arr = this.state.drawn.slice();
            this.setState({ drawn: [] });
            while (num > 0) {
                arr.push(this.state.deck.pop())
                num -= 1;
            }
            this.setState({
                drawn: arr
            });
        }
    }

    currentDeckState(){
        return this.state.deck.length
    }

    render() {
        return (
            <Grid columns='equal'>
                <Grid.Row>
                    {this.state.deck.length > 0 ? <Grid.Column >
                        <Segment.Group>
                            <Segment className="deckHead" textAlign='center'>
                                <Header as='h2' content='Deck-Cards' />
                            </Segment>
                          
                            <Segment className="deckCards" textAlign='left'>
                                <Container> 	
                                {
                                    this.state.deck.map((rowdata) =>
                                        <span key={shortid.generate()} style={{ 'fontSize': '120px', 'lineHeight': '1em', 'color': rowdata[0].colour }} >
                                            {this.displayCards(rowdata[0].code, rowdata[1].code)}
                                    </span>
                                    )
                                }
                                </Container>
                            </Segment>
                        </Segment.Group>
                    </Grid.Column> : null }
                    
                    {this.state.drawn.length > 0 ?  <Grid.Column > 
                        <Segment.Group>
                            <Segment className="drawnHead" textAlign='center'>
                                <Header as='h2' content='Drawn Cards' />
                            </Segment>
                            
                            <Segment className="drawnCards" textAlign='left'>
                                <Container> 
                                {
                                    this.state.drawn.map((rowdata) =>
                                        <span key={shortid.generate()} style={{ 'fontSize': '120px', 'lineHeight': '1em', 'color': rowdata[0].colour }} >
                                            {this.displayCards(rowdata[0].code, rowdata[1].code)}
                                        </span>
                                    )
                                }
                                </Container>
                            </Segment>
                        </Segment.Group> 
                    </Grid.Column> : null }
                </Grid.Row>
            </Grid>
        )
    }
}

export default Card;

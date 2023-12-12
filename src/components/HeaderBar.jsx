import React, { useState } from "react";
import { Header, Button, Form } from 'semantic-ui-react';

export default function HeaderBar(props){
    const [data, setData] = useState({number:""});
    
    const onChange = e => {
    setData({ 
        [e.target.name]: e.target.value}
    );
    }
    const onSubmit = () => {
            props.submit(data);
   }
   
    const suffle = () => {
        props.suffleCards();
    }

    const sort = () => {
        props.sortCards();
    }

    
        return (
            <Header as='h2' block>
                <Header.Content >
                <Button onClick={suffle} floated='left'>Suffle</Button>
                <Button onClick={sort} floated='left'>Sort</Button>
                    <Form style={{ float: 'right' }} onSubmit={onSubmit} >
                    <Form.Group widths='equal'>
                    <Form.Input
                        action='Draw'
                        type="number"
                        id="number"
                        name="number"
                        value={data.number}
                        onChange={onChange}                        
                        />
                         </Form.Group>
                </Form>
                </Header.Content>
            </Header>
        )
}

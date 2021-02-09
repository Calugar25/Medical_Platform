import React, { Component } from 'react';
import { Client } from '@stomp/stompjs';


import BackgroundImg from './commons/images/future-medicine.jpg';

import { Button, CardHeader, Container, Jumbotron } from 'reactstrap';
import { FormGroup, Input, Label } from 'reactstrap';
import Drawer from '@material/react-drawer'
const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "1920px",
    backgroundImage: `url(${BackgroundImg})`
};
const textStyle = { color: 'white', };
const textStyle2 = { color: "red", };

class CaregiverSensor extends Component {

    state = {
        serverTime: null,
        messages: [],
        open: false
    }

    toggle = () => {
        let { toggle } = this.state;

        this.setState({ open: !this.state.open });
    };

    componentDidMount() {
        console.log('Component did mount');

        this.client = new Client();

        this.client.configure({
            brokerURL: 'wss://backend-marius-final.herokuapp.com/stomp',
            onConnect: () => {
                console.log('onConnect');

                this.client.subscribe('/topic/greetings', message => {

                    // alert(message.body);
                    console.log("ghb", message.body)
                    this.setState({
                        messages: this.state.messages.concat([message.body])
                    })
                    // const data=JSON.parse(messsage.data)
                    // this.setState((state)=>
                    // )
                });
            },
            // Helps during debugging, remove in production
            debug: (str) => {
                console.log(new Date(), str);
            }
        });

        this.client.activate();
    }



    changeOnClick() {
        console.log(window.localStorage.getItem("loggedUser"))
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">

                    <ul>{this.state.messages.slice(-5).map((msg, idx) => <CardHeader><li
                        key={'msg-' + idx}>{msg}</li></CardHeader>)}</ul>;



               <div>


                    </div>
                </header>

                <Jumbotron fluid style={backgroundStyle}>
                    <Container fluid>
                        <h1 className="display-3" style={textStyle}>This is the Sensor Monitoring Page</h1>

                        <p className="lead">
                            <Button color="primary" onClick={() => this.changeOnClick()}>Learn
                                More</Button>
                        </p>
                    </Container>
                </Jumbotron>
            </div>
        );
    }
}

export default CaregiverSensor;

import React from 'react';

import BackgroundImg from '../commons/images/future-medicine.jpg';

import {Button, Container, Jumbotron} from 'reactstrap';
import { FormGroup, Input, Label} from 'reactstrap';
import NavigationBarContainer from "../navigation-bar"
const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "1920px",
    backgroundImage: `url(${BackgroundImg})`
};
const textStyle = {color: 'white', };

class Home extends React.Component {
   
    constructor(props)
    {   super(props)
        this.account=props.apiResource
        this.state={
            details:""
        }
        this.handleClick=this.handleClick.bind(this)
    }

    handleClick = () => {
      
        var vr = JSON.parse(window.localStorage.getItem("loggedUser"))
        
        console.log(" "+vr.roles);
      }

   

    render() {
       
        return (

            <div>
                <NavigationBarContainer user={this.account}/>
                  <Button color="primary" onClick={this.handleClick}>ShowDetails </Button>
        
                <Jumbotron fluid style={backgroundStyle}>
                    <Container fluid>
                        <h1 className="display-3" style={textStyle}>This is the Doctor page</h1>
                       
                        <p className="lead">
                            <Button color="primary" onClick={() => window.open('http://coned.utcluj.ro/~salomie/DS_Lic/')}>Learn
                                More</Button>
                        </p>
                    </Container>
                </Jumbotron>
               
            </div>
        )
    };
}

export default Home

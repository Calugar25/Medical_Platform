import React, { useState } from "react";
import { FormGroup, Input, Label} from 'reactstrap';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {debug} from "../commons/defs";
import history from "../history"
import { createBrowserHistory } from 'history';
import CrudApi from "../commons/api/crudApi";

class Login extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            message:'',
            error: false,
        };
        this.login=this.login.bind(this)
        this.account = null;
        this.api=new CrudApi("");
        this.getUser=this.getUser.bind(this);
        this.HandleUsernameChange = this.HandleUsernameChange.bind(this);
        this.HandlePasswordChange = this.HandlePasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.onLogin=this.onLogin.bind(this);
    }
    HandleUsernameChange=(e)=>this.setState({
        username:e.target.value
    });

    HandlePasswordChange=(e)=>this.setState({
        password:e.target.value
    });

    getUser(username,password)
    {
        this.api.checkLogin(username,password).then((response) => {
            // ...
            console.log("am i in login ?")
            /*if(!response.data)
            {alert("password incorect")
               console.log("resp",response) 
            }else{
          */
           if(response.data.roles=="DOCTOR")
           {
            window.localStorage.setItem('loggedUser',JSON.stringify(response.data))
            history.push("home")
            console.log("doctor",response.data)
            
               
           
           }
           if(response.data.roles=="PATIENT")
            {window.localStorage.setItem('loggedUser',JSON.stringify(response.data))
               history.push("patientrole")
               console.log("patient",response.data)
               
           }
           if(response.data.roles=="CAREGIVER")
           {
            
            window.localStorage.setItem('loggedUser',JSON.stringify(response.data))
               history.push("caregiverrole")
              
              
               
           }}
           );
    }


    onLogin()
    {
        var role = JSON.parse(window.localStorage.getItem("loggedUser")).roles
        console.log(role)

        if(role=="DOCTOR")
       {
           history.push("home")
       }
       if(role=="PATIENT")
       {
           history.push("patientrole")
       }
       if(role=="CAREGIVER")
       {
           history.push("caregiverrole")
       }

    }

    login()
    {
        this.api.checkLogin2(this.state.username,this.state.password).then(
            res=>{
                this.setState({
                    message:"LoggedIn"
                })
                if(debug) console.log("logged in",res.headers.authorization)
                console.log("asta e useru si parola",this.state.username,this.state.password)
                window.localStorage.setItem("jwtToken",JSON.stringify(res.headers.authorization))
                
                this.api.getUser(res.headers.authorization)
                .then(rs=>{
                    console.log("asta nu ma intereseaza",JSON.stringify(rs.data))
                    window.localStorage.setItem("loggedUser",JSON.stringify(rs.data))
                    this.onLogin()

                })
            },
            err => this.setState({message: "Not LoggedIn"})
        )
    }

    
    onSubmit() {
        //this.getUser(this.state.username,this.state.password);
        console.log("why")
        console.log("asta e inainte ",localStorage.getItem("loggedUser"))
        window.localStorage.clear();
        console.log("asta e dupa ",localStorage.getItem("loggedUser"))
       this.login()

        
       //history.push("/home");
     }

  render(){
  return (
    <div>
                
  
        <Label for='usernameField'> Username: </Label>
        <Input name='username' id='usernameField' placeholder={this.state.username}
               onChange={this.HandleUsernameChange}
              
        />
         <Label for='passwordField'> Password: </Label>
        <Input type="password" name='password' id='passwordField' placeholder={this.state.password}
               onChange={this.HandlePasswordChange}
              
        />
         <Button type={"submit"} onClick={this.onSubmit}>  Login </Button>

    </div>
  );
}}


export default Login;
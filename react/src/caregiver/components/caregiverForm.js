import React from 'react';
import validate from "./caregiver-validator";
import Button from "react-bootstrap/Button";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';

import CrudApi from "../../commons/api/crudApi";


class CareGiverForm extends React.Component {

    constructor(props) {
        super(props);
        
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;
        this.api=new CrudApi("caregivers");
       // this.object = props.object
        

        this.state = {

            errorStatus: 0,
            error: null,
         

            formIsValid: false,

            formControls: {
                name: {
                    value:'',
                    placeholder: 'What is your name?...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                birthDate: {
                    value: '',
                    placeholder: 'BirthDate DD--MM--YYYY',
                    valid: false,
                    touched: false,
                    
                },
                gender: {
                    value: '',
                    placeholder: 'Gender',
                    valid: false,
                    touched: false,
                },
                address: {
                    value: '',
                    placeholder: 'Cluj, Zorilor, Str. Lalelelor 21...',
                    valid: false,
                    touched: false,
                },
                
                username: {
                    value: '',
                    placeholder: 'Marius_Username',
                    valid: false,
                    touched: false,
                },
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }


    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };

    registerObject(object) {


        this.api.create(object)
        .then(
            res => {
                console.log("test",object);
                this.setState({formControls: this.state.formControls},
                   this.reloadHandler
                )

            })
    }

    handleSubmit() {
        let patient = {
            name: this.state.formControls.name.value,
            gender:this.state.formControls.gender.value,
            address: this.state.formControls.address.value,
          
            username:this.state.formControls.username.value,
            birthDate:this.state.formControls.birthDate.value
        };

        console.log("ghb");
        this.registerObject(patient);
    }

    render() {
        return (
            <div>
                
                <FormGroup id='name'>
                    <Label for='nameField'> Name: </Label>
                    <Input name='name' id='nameField' placeholder={this.state.formControls.name.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.name.value}
                           touched={this.state.formControls.name.touched? 1 : 0}
                           valid={this.state.formControls.name.valid}
                           required
                    />
                    {this.state.formControls.name.touched && !this.state.formControls.name.valid &&
                    <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='birthDate'>
                    <Label for='birthDateField'> BirthDate: </Label>
                    <Input name='birthDate' id='birthDateField' placeholder={this.state.formControls.birthDate.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.birthDate.value}
                           touched={this.state.formControls.birthDate.touched? 1 : 0}
                           valid={this.state.formControls.birthDate.valid}
                           required
                    />
                    {this.state.formControls.birthDate.touched && !this.state.formControls.birthDate.valid &&
                    <div className={"error-message row"}> * BirthDate must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='gender'>
                    <Label for='genderField'> Gender: </Label>
                    <Input name='gender' id='genderField' placeholder={this.state.formControls.gender.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.gender.value}
                           touched={this.state.formControls.gender.touched? 1 : 0}
                           valid={this.state.formControls.gender.valid}
                           required
                    />
                    {this.state.formControls.gender.touched && !this.state.formControls.gender.valid &&
                    <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='address'>
                    <Label for='addressField'> Address: </Label>
                    <Input name='address' id='addressField' placeholder={this.state.formControls.address.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.address.value}
                           touched={this.state.formControls.address.touched? 1 : 0}
                           valid={this.state.formControls.address.valid}
                           required
                    />
                    {this.state.formControls.address.touched && !this.state.formControls.address.valid &&
                    <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>

                

                
                <FormGroup id='username'>
                    <Label for='usernameField'> Username: </Label>
                    <Input name='username' id='usernameField' placeholder={this.state.formControls.username.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.username.value}
                           touched={this.state.formControls.username.touched? 1 : 0}
                           valid={this.state.formControls.username.valid}
                           required
                    />
                    {this.state.formControls.username.touched && !this.state.formControls.username.valid &&
                    <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>


                    <Row>
                        <Col sm={{size: '4', offset: 8}}>
                            <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}>  Submit </Button>
                        </Col>
                    </Row>

                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </div>
        ) ;
    }
}

export default CareGiverForm;

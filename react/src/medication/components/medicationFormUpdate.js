import React from 'react';
import validate from "./medication-validator";
import Button from "react-bootstrap/Button";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';

import CrudApi from "../../commons/api/crudApi";


class PatientFormUpdate extends React.Component {

    constructor(props) {
        super(props);
        
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;
        this.api=new CrudApi("patients");
        this.object = props.object
        ///this.url=props.object._links.self.href

        this.state = {

            errorStatus: 0,
            error: null,
         

            formIsValid: false,
            formControls: {
                name: {
                    value:this.object.name,
                    placeholder: 'What is the medication name ?...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                listSideEffects: {
                    value: this.object.listSideEffects,
                    placeholder: 'you will feel sick',
                    valid: false,
                    touched: false,
                    
                },
                dosage: {
                    value: this.object.dosage,
                    placeholder: '0.1ml',
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

    updateObject(ob) {

    /*  console.log("internal",ob)
        this.api.update(ob)
        .then(
            res => {
                console.log("test",ob);
                this.setState({formControls: this.state.formControls},
                   this.reloadHandler
                )

            })*/
           
            this.api.client({method: 'put', 
            url: this.object._links.self.href,
            data: ob
          })
        .then((res) => {
           
            this.setState({formControls: this.state.formControls},
                this.reloadHandler
             )
            
        })

    }

    handleSubmit() {
        let patient={
        name: this.state.formControls.name.value,
        listSideEffects:this.state.formControls.listSideEffects.value,
        dosage:this.state.formControls.dosage.value
       
        }
      
        this.updateObject(patient)

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

                <FormGroup id='listSideEffects'>
                    <Label for='listSideEffectsField'> listSideEffects: </Label>
                    <Input name='listSideEffects' id='listSideEffectsField' placeholder={this.state.formControls.listSideEffects.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.listSideEffects.value}
                           touched={this.state.formControls.listSideEffects.touched? 1 : 0}
                           valid={this.state.formControls.listSideEffects.valid}
                           required
                    />
                    {this.state.formControls.listSideEffects.touched && !this.state.formControls.listSideEffects.valid &&
                    <div className={"error-message row"}> * BirthDate must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='dosage'>
                    <Label for='dosageField'> dosage: </Label>
                    <Input name='dosage' id='dosageField' placeholder={this.state.formControls.dosage.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.dosage.value}
                           touched={this.state.formControls.dosage.touched? 1 : 0}
                           valid={this.state.formControls.dosage.valid}
                           required
                    />
                    {this.state.formControls.dosage.touched && !this.state.formControls.dosage.valid &&
                    <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>

                    <Row>
                        <Col sm={{size: '4', offset: 8}}>
                            <Button type={"submit"} onClick={this.handleSubmit}> Submit </Button>
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

export default PatientFormUpdate;

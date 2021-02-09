import React from 'react';
import APIResponseErrorMessage from "./commons/errorhandling/api-response-error-message";
import {
    Button,
    Card,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from 'reactstrap';

import { debug } from './commons/defs'

import PatientForm from "./patient/components/patientForm";
import PatientTable from "./patient/components/patientTable";
import PatientFormUpdate from "./patient/components/patientFormUpdate";
import MedicationPlanTable from "./MedicationPlan/MedicationPlanTable";

import CrudApi from "./commons/api/crudApi";
import MedicationTable from './medication/components/medicationTable';
import NavigationBarContainer from "./navigation-bar"
class PatientRole extends React.Component {

    constructor(props) {
        super(props);
        this.api = new CrudApi(props.apiResource);
        this.apiPlan = new CrudApi("medicationPlans")
        this.toggleForm = this.toggleForm.bind(this)
        this.reload = this.reload.bind(this);
        this.fetchObjects = this.fetchObjects.bind(this)
        this.updateSelectedRow = this.updateSelectedRow.bind(this)
        this.deleteSelected = this.deleteSelected.bind(this)
        this.toggleUpdateForm = this.toggleUpdateForm.bind(this)
        this.closeForm = this.closeForm.bind(this)
        this.closeUpdateForm = this.closeUpdateForm.bind(this)

        this.handleClick = this.handleClick.bind(this)
       this.account=props.apiResource
        
        this.state = {
            selected: false,
            tableData: [],
            isLoaded: false,
            colapseForm: false,
            errorStatus: 0,
            error: null,
            selectedRow: null,
            selectedUpdate: false,
           accountName:'',

        };


    }


    componentDidMount() {
        this.fetchObjects();
    }








    /* fetchObjects() {
         var variable=JSON.parse(window.localStorage.getItem("loggedCaregiver"))
         let patient={
             name:variable.name,
             username:variable.username,
             gender:variable.gender,
             address:variable.address,
             birthday:variable.birthday
         };
         var test=window.localStorage.getItem("loggedCaregiver")
         console.log("test1"+test._links.self.href)
         this.api.read(variable)
         .then(
             
             res => {
                 console.log("mm"+res)
                 this.setState({tableData: res, isLoaded: true})
                 
                // console.log("nucred",res[0]._links.self.href);
             },
             err => {
                 this.setState({errorStatus: err, error: err})
             }
         )
     }*/

    fetchObjects() {
        var variable = JSON.parse(window.localStorage.getItem("loggedUser"))
        this.setState({
            accountName:variable.name
        })
        this.api.readAll()
            .then(
                res => {
                    console.log("in here ", window.localStorage.getItem('loggedUser'))
                    var idx;
                    res.map(function (value, index) {

                        if (JSON.parse(window.localStorage.getItem('loggedUser')).username == value.username) {
                            idx = index;

                        }
                    })

                    this.api.readSubresources(res[idx], "medicationPlan")
                        .then(
                            res => {
                                var vari = JSON.stringify(res)
                                console.log("este" + res)
                                this.setState({ tableData: res, isLoaded: true })
                            }
                        )
                },
                err => {
                    this.setState({ errorStatus: err, error: err })
                }
            )

    }
    /*
    fetchObjects() {
        var variable = window.localStorage.getItem("test")
        
        this.api.readSubresources(variable, "patients")
            .then(
                res => {
                    this.setState({
                        tableData:res,isLoaded:true
                    })
                },
                err=>{
                    this.setState({errorStatus: err, error: err})
                }
            )
    }
*/

    toggleForm() {
        this.setState({ selected: !this.state.selected });
    }

    closeForm() {
        this.setState({ selected: false })
    }

    toggleUpdateForm() {
        if (!(this.state.selectedRow === null))
            this.setState({ selectedUpdate: !this.state.selectedUpdate })
    }

    closeUpdateForm() {
        this.setState({ selectedUpdate: false })
    }

    reload() {
        this.setState({
            isLoaded: false,
            selectedRow: null
        });
        this.closeForm()
        this.closeUpdateForm()
        this.fetchObjects()
    }

    
    updateSelectedRow(index) {
        if (debug) console.log('received selected row index: ', index)

        this.setState({
            selectedRow: index,

        })
       this.apiPlan.readSubresources(this.state.tableData[index],"medications")
       .then(
           res=>{
               console.log("These are the medications coresponding to the medication plan that you have clicked",res)
           }
       )
    }

    deleteSelected() {
        console.log("test", this.state.selectedRow, this.state.tableData[this.state.selectedRow])
        if (!(this.state.selectedRow === null)) {

            this.api.delete(this.state.tableData[this.state.selectedRow])
                .then(
                    res => {
                        this.reload()
                    },
                    err => {
                        this.setState({ errorStatus: err, error: err })
                    }
                )
        }
    }

    handleClick = () => {
        var variable = JSON.parse(window.localStorage.getItem("loggedUser"))

        console.log(JSON.stringify(variable));
    }

  


    render() {

        return (
            <div>

                <Button color="primary" onClick={this.handleClick}>ShowDetails </Button>
                <NavigationBarContainer user={this.account}/>
                <CardHeader>
                    <strong> {this.state.accountName}-Patient </strong>
                </CardHeader>
                <Card>
                    <br />


                    <br />
                    <Row>
                        <Col sm={{ size: '8', offset: 1 }}>
                            {this.state.isLoaded && <MedicationPlanTable tableData={this.state.tableData}
                                selectedHandler={this.updateSelectedRow}
                            />}

                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />}
                        </Col>
                    </Row>
                   
                </Card>

                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                    className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Add Patient1: </ModalHeader>
                    <ModalBody>
                        <PatientForm
                            reloadHandler={this.reload}
                            apiResource={this.apiResource}
                            isUpdate={false} />
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selectedUpdate} toggle={this.toggleUpdateForm}
                    className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleUpdateForm}> Update  </ModalHeader>
                    <ModalBody>
                        <PatientFormUpdate
                            reloadHandler={this.reload}
                            apiResource={this.apiResource}
                            isUpdate={true}
                            object={this.state.tableData[this.state.selectedRow]}

                        />
                    </ModalBody>
                </Modal>

            </div>
        )

    }
}

export default PatientRole;
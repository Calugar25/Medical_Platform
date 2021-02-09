import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
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

import {debug} from '../commons/defs'

import MedicationForm from "./components/medicationForm";
import MedicationTable from "./components/medicationTable";
import MedicationFormUpdate from "./components/medicationFormUpdate";
import NavigationBarContainer from "../navigation-bar"
import CrudApi from "../commons/api/crudApi";

class MedicationContainer extends React.Component{

    constructor (props )
    {
        super (props);
        this.api=new CrudApi(props.apiResource);
        this.toggleForm = this.toggleForm.bind(this)
        this.reload = this.reload.bind(this);
        this.fetchObjects = this.fetchObjects.bind(this)
        this.updateSelectedRow=this.updateSelectedRow.bind(this)
        this.deleteSelected=this.deleteSelected.bind(this)
        this.toggleUpdateForm = this.toggleUpdateForm.bind(this)
        this.closeForm = this.closeForm.bind(this)
        this.closeUpdateForm = this.closeUpdateForm.bind(this)
        this.account="doctor"
        this.state={
            selected:false,
            tableData:[],
            isLoaded:false,
            colapseForm:false,
            errorStatus:0,
            error: null,
            selectedRow:null,
            selectedUpdate:false,
            accountName:'',
            
        };

        
    }


    componentDidMount(){
        this.fetchObjects();
    }


 
    fetchObjects() {
        var variable = JSON.parse(window.localStorage.getItem("loggedUser"))
            this.setState({
                accountName:variable.name
            })
        this.api.readAll()
        .then(
            res => {
                this.setState({tableData: res, isLoaded: true})
               // console.log("nucred",res[0]._links.self.href);
            },
            err => {
                this.setState({errorStatus: err, error: err})
            }
        )
    }

    toggleForm() {
        this.setState({selected: !this.state.selected});
    }

    closeForm() {
        this.setState({selected: false})
    }

    toggleUpdateForm() {
        if (!(this.state.selectedRow === null))
            this.setState({selectedUpdate: !this.state.selectedUpdate})
    }

    closeUpdateForm() {
        this.setState({selectedUpdate: false})
    }

    reload() {
        this.setState({
            isLoaded: false,
            selectedRow:null
        });
        this.closeForm()
        this.closeUpdateForm()
        this.fetchObjects()
    }
  
    updateSelectedRow(index) {
        if (debug) console.log('received selected row index: ', index)

        this.setState({
            selectedRow: index
        })
    }

    deleteSelected() {
       
        if (!(this.state.selectedRow === null)) {
            
            this.api.delete(this.state.tableData[this.state.selectedRow])
            .then(
                res => {
                    this.reload()
                },
                err => {
                    this.setState({errorStatus: err, error: err})
                }
            )
        }
    }

    render() {
        return (
            <div>
                <CardHeader>
                    <strong> Medication  Management </strong>
                </CardHeader>
                <NavigationBarContainer user={this.account}/>
                <strong> {this.state.accountName}- Logged</strong>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '2', offset: 2}}>
                            <Button color="primary" onClick={this.toggleForm}>Add Medication </Button>

                        </Col>
                        <Col sm={{size: '3', offset: 1}}>
                            <Button color="primary" onClick={this.deleteSelected}>Delete selected  </Button>
                        </Col>

                        <Col sm={{size: '3', offset: 1}}>
                            <Button color="primary" onClick={this.toggleUpdateForm}>Edit selected  </Button>
                        </Col>
                    </Row>
                    <h1>{this.state.incredibil}</h1>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <MedicationTable tableData = {this.state.tableData}
                            selectedHandler={this.updateSelectedRow}
                           />}
                         
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                                            errorStatus={this.state.errorStatus}
                                                            error={this.state.error}
                                                        />   }
                        </Col>
                    </Row>
                </Card>

                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Add Patient1: </ModalHeader>
                    <ModalBody>
                        <MedicationForm 
                        reloadHandler={this.reload}
                        apiResource={this.apiResource}
                        isUpdate={false}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selectedUpdate} toggle={this.toggleUpdateForm}
                    className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleUpdateForm}> Update  </ModalHeader>
                    <ModalBody>
                        <MedicationFormUpdate
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

export default MedicationContainer;
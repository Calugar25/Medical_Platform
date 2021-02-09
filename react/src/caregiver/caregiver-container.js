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

import CareGiverForm from "./components/caregiverForm";
import CareGiverTable from "./components/caregiverTable";
import CareGiverFormUpdate from "./components/caregiverFormUpdate";

import CrudApi from "../commons/api/crudApi";
import PatientTable from '../patient/components/patientTable';
import NavigationBarContainer from "../navigation-bar"
class CareGiverContainer extends React.Component{

    constructor (props )
    {
        super (props);
        this.api=new CrudApi(props.apiResource);
        this.api2=new CrudApi("patients");

        this.toggleForm = this.toggleForm.bind(this)
        this.reload = this.reload.bind(this);
        this.fetchObjects = this.fetchObjects.bind(this)
        this.updateSelectedRow=this.updateSelectedRow.bind(this)

        this.updateSelectedRow2=this.updateSelectedRow2.bind(this)

        this.deleteSelected=this.deleteSelected.bind(this)
        this.toggleUpdateForm = this.toggleUpdateForm.bind(this)
        this.closeForm = this.closeForm.bind(this)
        this.closeUpdateForm = this.closeUpdateForm.bind(this)

        this.associate=this.associate.bind(this)
        this.account="doctor"
        this.state={
            selected:false,
            tableData:[],
            tableData2:[],
            isLoaded:false,
            isLoaded2:false,
            colapseForm:false,
            errorStatus:0,
            error: null,
            selectedRow:null,
            selectedRow2:null,
            selectedUpdate:false,
            accountName:'',
            
        };

        
    }


    componentDidMount(){
        this.fetchObjects();
    }


    
    associate(){
        console.log("zz",this.state.tableData2[this.state.selectedRow2])
        this.api.addSubresource(this.state.tableData[this.state.selectedRow],this.state.tableData2[this.state.selectedRow2])
        .then(
            res=>{
                console.log("res",res)
            }
        )
        
    }
    fetchObjects() {
        var variable = JSON.parse(window.localStorage.getItem("loggedUser"))
            this.setState({
                accountName:variable.name
            })
        this.api.readAll()
        .then(
            res => {
                console.log("ce gem"+res)
                this.setState({tableData: res, isLoaded: true})
               // console.log("nucred",res[0]._links.self.href);
            },
            err => {
                this.setState({errorStatus: err, error: err})
            }
        )
        this.api2.readAll()
        .then(
            rs => {
                console.log("oo",rs)
                this.setState({tableData2: rs, isLoaded2: true})
               // console.log("nucred",res[0]._links.self.href);
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
            isLoaded2:false,
            selectedRow:null,
            selectedRow2:null
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
    updateSelectedRow2(index) {
        if (debug) console.log('received selected row index: ', index)

        this.setState({
            selectedRow2: index
        })
    }

    deleteSelected() {
        console.log("test",this.state.selectedRow,this.state.tableData[this.state.selectedRow])
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
                    <strong> Caregiver  Management </strong>
                   
                </CardHeader>
                <NavigationBarContainer user={this.account}/>
                <strong> {this.state.accountName}- Logged</strong>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '2', offset: 2}}>
                            <Button color="primary" onClick={this.toggleForm}>Add CareGiver </Button>

                        </Col>
                        <Col sm={{size: '3', offset: 1}}>
                            <Button color="primary" onClick={this.deleteSelected}>Delete selected  </Button>
                        </Col>

                        <Col sm={{size: '3', offset: 1}}>
                            <Button color="primary" onClick={this.toggleUpdateForm}>Edit selected  </Button>
                        </Col>
                        <Col sm={{size: '3', offset: 1}}>
                            <Button color="primary" onClick={this.associate}>Add patient to caregiver  </Button>
                        </Col>
                    </Row>
                    <h1>{this.state.incredibil}</h1>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <CareGiverTable tableData = {this.state.tableData}
                            selectedHandler={this.updateSelectedRow}
                           />}
                         
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                                            errorStatus={this.state.errorStatus}
                                                            error={this.state.error}
                                                        />   }
                        </Col>
                    </Row>
                </Card>
                <Card>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded2 && <PatientTable tableData = {this.state.tableData2}
                            selectedHandler={this.updateSelectedRow2}
                           />}
                         
                           
                        </Col>
                    </Row>
                </Card>

                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Add CareGiver: </ModalHeader>
                    <ModalBody>
                        <CareGiverForm 
                        reloadHandler={this.reload}
                        apiResource={this.apiResource}
                        isUpdate={false}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.selectedUpdate} toggle={this.toggleUpdateForm}
                    className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleUpdateForm}> Update  </ModalHeader>
                    <ModalBody>
                        <CareGiverFormUpdate
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

export default CareGiverContainer;
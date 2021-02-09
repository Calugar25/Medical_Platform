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

import { debug } from '../commons/defs'

import PatientForm from "./components/patientForm";
import PatientTable from "./components/patientTable";
import PatientFormUpdate from "./components/patientFormUpdate";

import CrudApi from "../commons/api/crudApi";
import MedicationTable from '../medication/components/medicationTable';
import NavigationBarContainer from '../navigation-bar';

class PatientContainer extends React.Component {

    constructor(props) {
        super(props);
        this.api = new CrudApi(props.apiResource);
        this.api2 = new CrudApi("medicationPlans");
        this.apimed = new CrudApi("medications");

        this.toggleForm = this.toggleForm.bind(this)
        this.reload = this.reload.bind(this);
        this.fetchObjects = this.fetchObjects.bind(this)
        this.updateSelectedRow = this.updateSelectedRow.bind(this)

        this.updateSelectedRowmed = this.updateSelectedRowmed.bind(this)

        this.deleteSelected = this.deleteSelected.bind(this)
        this.toggleUpdateForm = this.toggleUpdateForm.bind(this)
        this.closeForm = this.closeForm.bind(this)
        this.closeUpdateForm = this.closeUpdateForm.bind(this)

        this.handleSubmit = this.handleSubmit.bind(this)

        this.handleChange = this.handleChange.bind(this)
        this.account="doctor"
        this.addSub=this.addSub.bind(this)
        this.state = {
            selected: false,
            tableData: [],
            tableDatamed: [],
            isLoaded: false,
            isLoadedmed: false,
            colapseForm: false,
            errorStatus: 0,
            error: null,
            selectedRow: null,
            selectedRowmed: null,
            selectedUpdate: false,
            newMedications: [],
            startDate: null,
            endDate: '',
            intakeInterval: '',

            indexes: [],
            cnt: 0,
            accountName:'',

        };


    }


    componentDidMount() {
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
                    this.setState({ tableData: res, isLoaded: true })
                    // console.log("nucred",res[0]._links.self.href);
                },
                err => {
                    this.setState({ errorStatus: err, error: err })
                }
            )
        this.apimed.readAll()
            .then(
                res => {
                    this.setState({
                        tableDatamed: res, isLoadedmed: true
                    })
                }
            )
    }

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
            selectedRow: index
        })
    }

    updateSelectedRowmed(index) {
        if (debug) console.log('received selected row index: ', index)

       /* this.setState({
            selectedRowmed: index,


        })*/

        this.setState(prevState => ({
            indexes: [...prevState.indexes, index],
            cnt: this.state.cnt + 1,
            selectedRow:index
        }))

        

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
    handleChange(event) {

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    addSub(medicationPlan)
    {
        for (var i = 0; i < this.state.cnt; i++) {
            console.log("this is the index and the value ", i, this.state.indexes[i])
            this.api2.addSubresource(medicationPlan, this.state.tableDatamed[this.state.indexes[i]])
                .then(
                    console.log("aaa"),
                    rs => {
                        console.log("result")
                    }
                )
        }
        
        this.setState({
            indexes: [],
            cnt: 0
        })
        console.log("this is the med plan",medicationPlan)
        this.api.addSubresourceMedPlan(this.state.tableData[this.state.selectedRow],medicationPlan)
        .then(
            res=>{
                console.log("mo",res)
            }
        )
    }


    handleSubmit() {
        let medicationPlan = {
            medications: [],
            intakeInterval: this.state.intakeInterval,
            endDate: this.state.endDate,
            startDate: this.state.startDate
        };
        let aux;
        this.api2.create(medicationPlan)
            .then(
                res => {
                    medicationPlan = res
                    /*console.log("asa",medicationPlan,this.state.tableDatamed[this.state.selectedRowmed])
                    this.api2.addSubresource(medicationPlan,this.state.tableDatamed[this.state.selectedRowmed])
                    .then(
                        rs=>{
                            console.log("asta e ?",rs)
                        }
                    )
                    */this.addSub(medicationPlan)
                   


                }
            )

       /*
        this.setState({
            indexes: [],
            cnt: 0
        })*/

    }




    render() {
        return (
            <div>
                <CardHeader>
                    <strong> Patient  Management </strong>
                </CardHeader>
                <NavigationBarContainer user={this.account}/>
                <strong> {this.state.accountName}- Logged</strong>
                <Card>
                    <br />
                    <Row>
                        <Col sm={{ size: '2', offset: 2 }}>
                            <Button color="primary" onClick={this.toggleForm}>Add Patient </Button>

                        </Col>
                        <Col sm={{ size: '3', offset: 1 }}>
                            <Button color="primary" onClick={this.deleteSelected}>Delete selected  </Button>
                        </Col>

                        <Col sm={{ size: '3', offset: 1 }}>
                            <Button color="primary" onClick={this.toggleUpdateForm}>Edit selected  </Button>
                        </Col>
                        <Col sm={{ size: '3', offset: 1 }}>
                            <Button color="primary" onClick={this.handleSubmit}>Medication Plan  </Button>
                        </Col>
                    </Row>
                    <h1>{this.state.incredibil}</h1>
                    <br />
                    <Row>
                        <Col sm={{ size: '8', offset: 1 }}>
                            {this.state.isLoaded && <PatientTable tableData={this.state.tableData}
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
                <Row>

                    <Col><p1>startDate</p1>
                        <input
                            type="text"
                            name='startDate'
                            onChange={this.handleChange}
                        /></Col>
                    <Col><p1>endDate</p1>
                        <input
                            type="text"
                            name='endDate'
                            onChange={this.handleChange}
                        /></Col>
                    <Col><p1>intakeInterval</p1>
                        <input
                            type="text"
                            name='intakeInterval'
                            onChange={this.handleChange}
                        /></Col>

                </Row>
                <Row>
                    <Col sm={{ size: '8', offset: 1 }}>
                        {this.state.isLoadedmed && <MedicationTable tableData={this.state.tableDatamed}
                            selectedHandler={this.updateSelectedRowmed}
                        />}


                    </Col>
                </Row>
            </div>
        )

    }
}

export default PatientContainer;
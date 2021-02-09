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
import PersonForm from "./components/person-form";
import PersonTable from "./components/person-table";
import CrudApi from "../commons/api/crudApi";




class PersonContainer extends React.Component {

    constructor(props) {
        super(props)
        this.toggleForm = this.toggleForm.bind(this)
        this.reload = this.reload.bind(this)
        this.api = new CrudApi(props.apiResource)
        this.fetchObjects = this.fetchObjects.bind(this)
        this.state = {
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null,
           
        };
    }

    componentDidMount() {
        this.fetchObjects();
    }

    fetchObjects() {
        this.api.readAll()
        .then(
            res => {
                this.setState({tableData: res, isLoaded: true})
            },
            err => {
                this.setState({errorStatus: err, error: err})
            }
        )
        }

    toggleForm() {
        this.setState({selected: !this.state.selected});
    }
    testFunctionContainer(index){
       console.log("bhn",index);
    }

    reload() {
        this.setState({
            isLoaded: false
        });
        this.toggleForm();
        this.fetchObjects();
    }

    render() {
        return (
            <div>
                <CardHeader>
                    <strong> Person Management </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm}>Add Person </Button>
                        </Col>
                    </Row>
                  
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <PersonTable tableData = {this.state.tableData}
                           
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
                    <ModalHeader toggle={this.toggleForm}> Add Person: </ModalHeader>
                    <ModalBody>
                        <PersonForm 
                        reloadHandler={this.reload}
                        apiResource={this.apiResource}
                        object={this.state.tableData[this.state.selectedRow]}/>
                    </ModalBody>
                </Modal>
                
                <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
         />
            </div>
        )

    }
}


export default PersonContainer;

import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavigationBar from './navigation-bar'
import Home from './home/home';
import PersonContainer from './person/person-container'
import CrudApi from './commons/api/crudApi';
import PatientContainer from "./patient/patient-container";
import CaregiverContainer from "./caregiver/caregiver-container";
import MedicationContainer from "./medication/medication-container";
import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';
import Login from "./login/Login"
import CareGiverRole from "./CareGiverRole"
import NavigationBarContainer from './navigation-bar';
import CaregiverSensor from "./caregiverSensor"
import PatientRole from "./PatientRole"

class App extends React.Component {

    errorMessage(){
        return (<p>You are not for this page</p>)
    }

    render() {
        let api = new CrudApi('patients');

        api.readAll()
        .then(res => {
            console.log('read all rsponse', res)
            api.create({
                name: '',
                gender: 'every time'
            })
            .then(res => {
                console.log('create', res)
                api.read(res)
                .then(res => {
                    console.log('read', res)
                    res['name'] = 'before'
                    api.update(res)
                    .then(res => {
                        console.log('update', res)
                        api.delete(res)
                        .then(res => {
                            console.log('delete', res)  
                        })  
                    })
                })
            })
        })
        return (
            <div className={styles.back}>
         
                <div>
                   
                    <Switch>

                        <Route
                            exact
                            path='/'
                            render={() => <Login/>}
                        />
                       
                       {JSON.parse(window.localStorage.getItem("loggedUser")).roles==="CAREGIVER"&&
                        <Route
                            exact
                            path='/caregiverrole'
                            render={() => <CareGiverRole
                            apiResource="caregivers"/>}
                        />}
                        {JSON.parse(window.localStorage.getItem("loggedUser")).roles==="PATIENT"&&
                        <Route
                            exact
                            path='/patientrole'
                            render={() => <PatientRole
                            apiResource="patients"/>}
                        />}
                        {JSON.parse(window.localStorage.getItem("loggedUser")).roles==="DOCTOR"&&
                        <Route
                            exact
                            path='/home'
                            render={() => <Home
                            apiResource="doctor"/>}
                        />}
                            
                        {JSON.parse(window.localStorage.getItem("loggedUser")).roles==="DOCTOR"&&
                         <Route
                            exact
                            path='/patient'
                            render={() => <PatientContainer
                                apiResource ='patients'/>}
                        />}
                        {JSON.parse(window.localStorage.getItem("loggedUser")).roles==="DOCTOR"&&
                        <Route
                            exact
                            path='/caregiver'
                            render={() => <CaregiverContainer
                                apiResource ='caregivers'/>}
                        />}
                        {JSON.parse(window.localStorage.getItem("loggedUser")).roles==="DOCTOR"&&
                        <Route
                            exact
                            path='/medication'
                            render={() => <MedicationContainer
                                apiResource ='medications'/>}
                        />}

                        {/*Error*/}
                        <Route
                            exact
                            path='/error'
                            render={() => <ErrorPage/>}
                        />

                            <Route
                                exact
                                path='/caregiver-sensor'
                                component={CaregiverSensor}>
                            </Route>


                        <Route render={() =><ErrorPage/>} />
                    </Switch>
                </div>
    
            </div>
        )
    };
}

export default App

import React from 'react'
import logo from './commons/images/icon.png';

import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavLink,
    UncontrolledDropdown
} from 'reactstrap';

const textStyle = {
    color: 'white',
    textDecoration: 'none'
};
/*
const NavigationBar = () => (
    <div>
        <Navbar color="dark" light expand="md">
            <NavbarBrand href="/">
                <img src={logo} width={"50"}
                     height={"35"} />
            </NavbarBrand>
            <Nav className="mr-auto" navbar>

                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle style={textStyle} nav caret>
                       Menu
                    </DropdownToggle>
                    <DropdownMenu right >

                     
                        <DropdownItem>
                            <NavLink href="/patient">Patients</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink href="/caregiver">CareGivers</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink href="/medication">Medications</NavLink>
                        </DropdownItem>
                        
                        


                    </DropdownMenu>
                </UncontrolledDropdown>

            </Nav>
        </Navbar>
    </div>
);
*/
class NavigationBarContainer extends React.Component {

    constructor(props) {
        super(props);
        this.user = this.props.user;
        console.log("nuuu"+this.user);
    }

    render() {
        return (
            <div>
                <Navbar color="dark" light expand="md">
                    <NavbarBrand href={"/" + this.user}>
                        <img src={logo} width={"50"}
                             height={"35"}/>
                    </NavbarBrand>
                    <Nav className="mr-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle style={textStyle} nav caret>
                                Menu
                            </DropdownToggle>
                            <DropdownMenu right>
                                {
                                    (this.user === "doctor" || this.user === "caregiver")
                                    &&
                                    <DropdownItem>
                                        <NavLink href="/patient">Patients</NavLink>
                                    </DropdownItem>
                                }
                                {
                                    this.user === "doctor"
                                    &&
                                    <DropdownItem>
                                        <NavLink href="/caregiver">Caregivers</NavLink>
                                    </DropdownItem>
                                }
                                {
                                    this.user === "patients"
                                    &&
                                    <DropdownItem>
                                        <NavLink href="/">Log Out</NavLink>
                                    </DropdownItem>
                                }
                                {
                                    this.user === "doctor"
                                    &&
                                    <DropdownItem>
                                        <NavLink href="/medication">Medication</NavLink>
                                        <NavLink href="/">LogOut</NavLink>
                                    </DropdownItem>
                                    
                                }
                                 {
                                    this.user === "doctor"||this.user==="caregivers"
                                    &&
                                    <DropdownItem>
                                        <NavLink href="/">LogOut</NavLink>
                                    </DropdownItem>
                                }
                            </DropdownMenu>
                        </UncontrolledDropdown>

                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default NavigationBarContainer;

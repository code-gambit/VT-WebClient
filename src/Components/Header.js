import React, { useState, useContext, useEffect } from 'react';
import { Auth } from "aws-amplify";
import { Navbar, NavbarBrand, Nav, NavbarToggler,
    Collapse, NavItem, Button, Dropdown, DropdownToggle,
    DropdownMenu, DropdownItem } from 'reactstrap';
import { NavLink, useHistory} from 'react-router-dom';
import { AuthContext } from '../Context/Contexts/AuthContext';
import * as AuthActionCreators from '../Context/ActionCreators/AuthActionCreater';
const Header = () => {
    const [isNavOpen,setIsNavOpen] = useState(false);
    const [state,setState] = useState(undefined);
    const [dropdownOpen,setDropdownOpen] = useState(false);
    const {authState, authDispatch} = useContext(AuthContext);
    const history=useHistory()
    useEffect(() =>{
        if (!authState.auth.PK) {
            const auth = JSON.parse(localStorage.getItem("auth"));
            if(auth) authDispatch(AuthActionCreators.authStateUpdate(auth));
            else setState(undefined);
        }
        else if(authState.auth.PK) {
            setState(authState.auth);
        }
    },[authState]);

    const toggleNav=()=> {
        setIsNavOpen(!isNavOpen)
    }
    const toggleDropdown=()=>{
        setDropdownOpen(!dropdownOpen)
    }

    const handleLogin = (event) =>{
        history.push('/authenticate')
        toggleNav();
    }
    const handleLogout = async (event) =>{
        toggleNav();
        authDispatch(AuthActionCreators.authStateUpdate({}));
        localStorage.clear()
        history.push('/')
    }


    const dropdown=()=>{
        return(
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle caret>
                    {state.PK}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>
                        <NavLink to='/profile'>Profile</NavLink>
                    </DropdownItem>
                    <DropdownItem onClick={handleLogout}>
                        Logout
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        )
    }
    return (
        <div>
            <Navbar dark expand="md">
                <div className="container">
                    <NavbarBrand className="mr-auto" href="/"><img src='logo.png'/> <span style={{fontFamily: "Lucida Console"}}> V-Transfer</span></NavbarBrand>
                    <NavbarToggler onClick={toggleNav} />
                        <>{
                            state?
                                <Collapse isOpen={isNavOpen} navbar>
                                    <Nav navbar>
                                        <NavItem>
                                            <NavLink className="nav-link" to='/dashboard'><span className="fa fa-file fa-lg"></span> Dashboard</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="nav-link" to='/files'><span className="fa fa-file fa-lg"></span> Files</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="nav-link" to='/about'><span className="fa fa-info fa-lg"></span> About</NavLink>
                                        </NavItem>
                                    </Nav>
                                    <Nav className="ml-auto" navbar>
                                        <NavItem>
                                            <Button outline> {dropdown()}</Button>
                                        </NavItem>
                                    </Nav>
                                </Collapse>

                                :
                                <Collapse isOpen={isNavOpen} navbar>
                                    <Nav navbar>
                                        <NavItem>
                                            <NavLink className="nav-link" to='/about'><span className="fa fa-info fa-lg"></span> About</NavLink>
                                        </NavItem>
                                    </Nav>
                                    <Nav className="ml-auto" navbar>
                                        <NavItem>
                                            <Button outline onClick={()=>handleLogin()}><span className="fa fa-user fa-lg"></span> Login</Button>
                                        </NavItem>
                                    </Nav>
                                </Collapse>
                        }</>
                </div>
            </Navbar>
        </div>
     );
}

export default Header;

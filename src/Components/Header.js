import React, { useState, useContext, useEffect } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler,
    Collapse, NavItem} from 'reactstrap';
import { NavLink, useHistory, useLocation} from 'react-router-dom';
import { AuthContext } from '../Context/Contexts/AuthContext';
import * as AuthActionCreators from '../Context/ActionCreators/AuthActionCreater';
const Header = () => {
    const [isNavOpen,setIsNavOpen] = useState(false);
    const [state,setState] = useState(undefined);
    const {authState, authDispatch} = useContext(AuthContext);
    const history=useHistory()
    const location = useLocation();
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
    const handleLogin = (event) =>{
        history.push('/authenticate')
        toggleNav();
    }    

    return (        
            <Navbar expand="md" className="navbar-wrapper">
                <div className="container">                                        
                    <NavbarBrand className="mr-auto" href="/"><img src='https://res.cloudinary.com/code-gambit/image/upload/v1621332949/Web%20App/logo_small_raglfm.png'/> <span style={{fontFamily: "Lucida Console"}}> V-Transfer</span></NavbarBrand>                                                            
                    <NavbarToggler onClick={toggleNav} className="navbar-wrapper">
                        {isNavOpen?
                            <i className="fa fa-times"></i>
                        :
                            <i className="fa fa-bars"></i>
                        }
                    </NavbarToggler>
                    <>{state?
                        <Collapse isOpen={isNavOpen} navbar onClick={toggleNav}>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink className="nav-link" to='/files'><span className="fa fa-file fa-lg"></span> Files</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to='/about'><span className="fa fa-info fa-lg"></span> About</NavLink>
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
                            {location.pathname !=="/authenticate"?
                                <Nav className="ml-auto" navbar>
                                    <NavItem onClick={()=>handleLogin()}>
                                        <span className="nav-link">
                                            <i className="fa fa-sign-in fa-lg"></i>Login
                                        </span>                                            
                                    </NavItem>
                                </Nav>
                            :
                                <div></div>
                            }                            
                        </Collapse>
                    }</>                    
                </div>
            </Navbar>

     );
}

export default Header;

import React,{useState,useContext} from 'react';
import { NavLink, useHistory} from 'react-router-dom';
import { AuthContext } from '../Context/Contexts/AuthContext';
import * as AuthActionCreators from '../Context/ActionCreators/AuthActionCreater';
const Footer = () => {
    const [isDarkMode,setIsDarkMode] = useState(false);    // true for dark mode
    const history=useHistory()
    const {authState, authDispatch} = useContext(AuthContext);
    const toggleLightMode=()=>{
        setIsDarkMode(!isDarkMode);
    }
    const handleLogout = async (event) =>{
        authDispatch(AuthActionCreators.authStateUpdate({}));
        localStorage.clear()
        history.push('/')
    }
    return ( 
        <div className="footer-wrapper fixed-bottom">
            <div className="container pt-3 pb-3">
                <div className="row justify-content-center text-center">             
                    <div className="col-6 col-sm-3 d-flex justify-content-around">
                        <a href="#" target="_blank" className="text-secondary">
                            <span className="fa fa-github fa-lg"></span>
                        </a>
                        <a href="#" target="_blank" className="text-info">
                            <span className="fa fa-linkedin fa-lg"></span>
                        </a>
                        <a href="#" target="_blank" className="text-primary">
                            <span className="fa fa-twitter fa-lg"></span>
                        </a>
                        <a href="#" target="_blank" className="text-danger">
                            <span className="fa fa-instagram fa-lg"></span>
                        </a>
                    </div>                                   
                    {authState.auth.PK?
                        <div className="col-4 col-sm-2 d-flex justify-content-around">
                            <span onClick={toggleLightMode}>
                                {!isDarkMode?
                                    <span className="fa fa-moon-o fa-lg"></span>
                                :
                                    <span className="fa fa-sun-o fa-lg"></span>
                                }
                            </span>
                            <NavLink to='/profile'><span className="fa fa-cog fa-lg"></span></NavLink>
                            <NavLink to='/'><span className="fa fa-sign-out fa-lg" onClick={handleLogout}></span></NavLink>                                                                                    
                        </div>     
                    :   <div></div>
                    }
                    <div className="col-12 col-sm-4">
                        v-transfer-demo@gmail.com
                    </div>                
                </div>
            </div>
        </div>
     );
}
 
export default Footer;
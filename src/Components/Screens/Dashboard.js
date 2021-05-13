import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/Contexts/AuthContext';
import SearchField from "react-search-field";

const Dashboard = () => {
    const {authState} = useContext(AuthContext);
    const [URLLink,setURLLink] = useState("");
    document.title=`${process.env.REACT_APP_TITLE}`
    const URLLinkUtil=()=>{
        window.location=URLLink;
    }
    return ( 
        <div className="container text-center">
            Dashboard
            <br/>
            <SearchField
                placeholder="Enter URL"
                onChange={(e)=>setURLLink(e)}
                onEnter={URLLinkUtil}
                onSearchClick={URLLinkUtil}                
                classNames="border border-dark rounded-lg"
            />
        </div>
     );
}
 
export default Dashboard;
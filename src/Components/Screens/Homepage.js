import React, {useState} from 'react';
import SearchField from "react-search-field";

const Homepage = () => {
    const [URLLink,setURLLink] = useState("");
    document.title=`${process.env.REACT_APP_TITLE}`
    const URLLinkUtil=()=>{
        window.location=URLLink;
    }
    return ( 
        <div className="container text-center">
            Welcome to V-Transfer
            <br></br>
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
 
export default Homepage;
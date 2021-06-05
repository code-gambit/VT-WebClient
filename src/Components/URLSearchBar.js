import React, {useState} from 'react';
import {toast} from 'react-toastify'
const URLSearchBar = () => {
    const [URLLink,setURLLink] = useState();
    const URLLinkUtil=()=>{
        if(URLLink) window.location=URLLink;
        else{
            toast.warning("URL can be empty")
        }
    }
    return ( 
        <div>
            <div className="search">
                <input type="text" className="searchTerm" placeholder="Enter URL" onChange={(e)=>setURLLink(e.target.value)}
                onKeyUp={(e)=>{
                    if(e.keyCode===13){
                        URLLinkUtil()
                    }
                }}/>
                <button type="submit" className="searchButton" onClick={URLLinkUtil}>
                    <i className="fa fa-search"></i>
                </button>                
            </div>
        </div>
     );
}
 
export default URLSearchBar ;
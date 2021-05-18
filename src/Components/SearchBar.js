import React, {useState} from 'react';

const SearchBar = () => {
    const [URLLink,setURLLink] = useState();
    const URLLinkUtil=()=>{
        window.location=URLLink;
    }
    return ( 
        <div>
            <div className="search">
                <input type="text" className="searchTerm" placeholder="Enter URL" onChange={(e)=>setURLLink(e.target.value)}/>
                <button type="submit" className="searchButton" onClick={URLLinkUtil}>
                    <i className="fa fa-search"></i>
                </button>                
            </div>
        </div>
     );
}
 
export default SearchBar ;
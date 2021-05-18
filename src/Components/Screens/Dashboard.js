import React from 'react';
import SearchBar from '../SearchBar';

const Dashboard = () => {
    document.title=`${process.env.REACT_APP_TITLE}`
    return ( 
        <div className="container text-center">
            Dashboard
            <br/>
            <div className="d-flex justify-content-center">
                <SearchBar/>
            </div>
        </div>
     );
}
 
export default Dashboard;
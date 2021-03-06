import React from 'react';
import URLSearchBar from '../URLSearchBar';

const Dashboard = () => {
    document.title=`${process.env.REACT_APP_TITLE}`
    return ( 
        <div className="container text-center">
            Dashboard
            <br/>
            <div className="d-flex justify-content-center">
                <URLSearchBar/>
            </div>
        </div>
     );
}
 
export default Dashboard;
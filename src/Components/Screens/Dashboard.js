import React, { useContext } from 'react';
import { AuthContext } from '../../Context/Contexts/AuthContext';

const Dashboard = () => {
    const {authState} = useContext(AuthContext);
    return ( 
        <div className="container">
            Dashboard
            <div>
                Total Size Used: {authState.auth.storage_used}                                
            </div>
        </div>
     );
}
 
export default Dashboard;
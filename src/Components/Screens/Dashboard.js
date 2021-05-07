import React, { useContext } from 'react';
import { AuthContext } from '../../Context/Contexts/AuthContext';
import { FileContext } from '../../Context/Contexts/FileContext';

const Dashboard = () => {
    const {authState} = useContext(AuthContext);
    const {fileState} = useContext(FileContext);
    return ( 
        <div className="container">
            Dashboard
            <div>
                Total Size Used: {authState.auth.storage_used}
                <br/>
                Total Files: {fileState.files.length}
            </div>
        </div>
     );
}
 
export default Dashboard;
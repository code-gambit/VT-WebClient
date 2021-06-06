import React from 'react';

export const Loading=()=>{
    return(
        <div className="text-center">
            <div className="loading-panel-wrap">
                <div className="loading-panel">
                    <span><h3>Loading</h3></span> 
                </div>
                <div className="shadow"></div>
            </div>
        </div>
    )
}
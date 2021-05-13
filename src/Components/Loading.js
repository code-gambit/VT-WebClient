import React from 'react';

export const Loading=()=>{
    return(
        <div className="text-center">
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw"></span>
            <p>Loading...</p>
            {/* <div class="spinner-grow" role="status">
                <span class="sr-only">Loading...</span>
            </div> */}
        </div>
    )
}
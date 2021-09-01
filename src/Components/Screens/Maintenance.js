import React from 'react';

const Maintenance = () => {
    return (
        <div className="container text-center">
            <div className="m-top-wrapper">
                <h2 className="">
                    We'll Be Back Soon
                </h2>
                <span>
                    V Transfer is down for maintenance and expect
                    <br/>
                    to back online in a few days.
                </span>
            </div>
            <div className="m-middle-wrapper">
                <img 
                    src="https://res.cloudinary.com/code-gambit/image/upload/v1630442215/Web%20App/Software-maintenance-services_bwekc3.png"
                    alt="Maintenance"
                    className="maintenance-image"
                />
            </div>
        </div>
    );
};

export default Maintenance;
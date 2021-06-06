import React from 'react';
if (process.env.REACT_APP_NODE_ENV === 'development') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, {
    });
}
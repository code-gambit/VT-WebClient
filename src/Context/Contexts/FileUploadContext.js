import React, { createContext, useReducer } from 'react';
import {fileUploadReducer} from '../Reducers/FileUploadReducer';

export const FileUploadContext = createContext();
const FileContextProvider = (props) => {
    const [fileUploadState, fileUploadDispatch] = useReducer(fileUploadReducer,{
        files:[],
    })
    return ( 
        <FileUploadContext.Provider value={{fileUploadState,fileUploadDispatch}}>
            {props.children}
        </FileUploadContext.Provider>
     );
}
 
export default FileContextProvider;
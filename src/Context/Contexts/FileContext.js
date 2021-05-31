import React, { createContext, useReducer } from 'react';
import {fileReducer} from '../Reducers/FileReducer';

export const FileContext = createContext();
const FileContextProvider = (props) => {
    const [fileState, fileDispatch] = useReducer(fileReducer,{
        isLoading:true,
        errMess:null,
        files:[],
        searchParam:undefined,
        currentPage:1,
        lastEKMap:{},
        startDate: undefined,
        endDate: undefined
    })
    return ( 
        <FileContext.Provider value={{fileState,fileDispatch}}>
            {props.children}
        </FileContext.Provider>
     );
}
 
export default FileContextProvider;
import React, { createContext, useReducer } from 'react';
import {fileReducer} from '../Reducers/FileReducer';

export const FileContext = createContext();
const FileContextProvider = (props) => {
    const [fileState, file_dispatch] = useReducer(fileReducer,{
        isLoading:true,
        errMess:null,
        files:[
            {
                PK:"USER#123",
                SK:"FILE#454",
                LS1_SK:"File1",
                hash:"878",
                size:"12",
                type:"audio"
            },{
                PK:"USER#123",
                SK:"FILE#454",
                LS1_SK:"File2",
                hash:"879",
                size:"12",
                type:"audio"
            },
            
        ]
    })
    return ( 
        <FileContext.Provider value={{fileState,file_dispatch}}>
            {props.children}
        </FileContext.Provider>
     );
}
 
export default FileContextProvider;
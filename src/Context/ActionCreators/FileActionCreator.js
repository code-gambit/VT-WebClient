import * as ActionTypes from '../ActionTypes';
import axios from 'axios';

export const fileStateLoading=()=>({
    type:ActionTypes.FILE_STATE_LOADING
})

export const fileStateFailed=()=>({
    type:ActionTypes.FILE_STATE_FAILED
})

export const fileStateAddFiles=(fileData)=>({
    type:ActionTypes.FILE_STATE_ADD_FILES,
    payload:fileData
})

export const fileStateUpdateFiles=(fileData)=>({
    type:ActionTypes.FILE_STATE_UPDATE_FILES,
    payload:fileData
})

export const fileStateUpdateCurrentPage=(pageNumber)=>({
    type:ActionTypes.FILE_STATE_UPDATE_CURRENT_PAGE,
    payload:pageNumber
})
export const fileStateAddLastEKMap=(payload)=>({
    type:ActionTypes.FILE_STATE_ADD_LASTEK_MAP,
    payload:{}
})
export const fileStateUpdateLastEKMap=(currentPage,lastEvaluatedKey)=>({
    type:ActionTypes.FILE_STATE_UPDATE_LASTEK_MAP,
    payload:{currentPage,lastEvaluatedKey}
})

export const addFile=(fileData,fileDispatch)=>{
    fileDispatch(fileStateUpdateFiles(fileData))
}

export const loadFiles = async (fileDispatch,currentPage,lastEvaluatedKey) => {
    var userId = JSON.parse(localStorage.getItem("auth")).PK.substring(5);
    axios.get(
        `${process.env.REACT_APP_BACKENDURL}/user/${userId}/file`,
        {
            params:{LastEvaluatedKey:lastEvaluatedKey},
            headers:{                                                
                'X-Api-Key':process.env.REACT_APP_APIKEY,                                                
            }
        }       
    ).then((response)=>{
        fileDispatch(fileStateAddFiles(response.data.body.items))
        fileDispatch(fileStateUpdateLastEKMap(currentPage,response.data.body.LastEvaluatedKey))       
    }, (error) => {
        console.log(error);
    })    
    
}

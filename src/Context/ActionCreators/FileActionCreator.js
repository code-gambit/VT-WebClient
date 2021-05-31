import * as ActionTypes from '../ActionTypes';
//import axios from 'axios';
import axios from '../../utils/axios'
import { toast } from 'react-toastify';

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

export const updateSearchParam = (searchParam)=>({
    type:ActionTypes.FILE_STATE_UPDATE_SEARCH_PARAM,
    payload:searchParam
})

export const updateStartDate = (startDate) => ({
    type: ActionTypes.FILE_STATE_UPDATE_START_DATE,
    payload: startDate
})

export const updateEndDate = (endDate) => ({
    type: ActionTypes.FILE_STATE_UPDATE_END_DATE,
    payload: endDate
})

export const loadFiles = async (fileDispatch,currentPage,lastEvaluatedKey,searchParam,start,end) => {
    fileDispatch(fileStateLoading());   
    const userId = JSON.parse(localStorage.getItem("auth")).PK;
    const queryParam={
        LastEvaluatedKey:lastEvaluatedKey,
        searchParam:searchParam,
        start:start,
        end:end,        
    }
    axios.get(
        `${process.env.REACT_APP_BACKENDURL}/user/${userId}/file`,
        {
            params:queryParam,
            headers:{                                                
                'X-Api-Key':process.env.REACT_APP_APIKEY,                                                
            }
        }       
    ).then((response)=>{              
        if(response.data.error){
            toast.error(response.data.error);
            fileDispatch(fileStateAddFiles([]));
            return;
        }          
        fileDispatch(fileStateAddFiles(response.data.body.items))
        fileDispatch(fileStateUpdateLastEKMap(currentPage,response.data.body.LastEvaluatedKey))       
    }, (error) => {
        console.log(error);
    })    
}
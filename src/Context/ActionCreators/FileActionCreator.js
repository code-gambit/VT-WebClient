import * as ActionTypes from '../ActionTypes';
import axios from 'axios';

export const fileStateLoading=()=>({
    type:ActionTypes.FILE_STATE_LOADING
})

export const fileStateFailed=()=>({
    type:ActionTypes.FILE_STATE_FAILED
})

export const fileStateADD=(fileData)=>({
    type:ActionTypes.FILE_STATE_ADD,
    payload:fileData
})

export const fileStateUpdate=(fileData)=>({
    type:ActionTypes.FILE_STATE_UPDATE,
    payload:fileData
})

export const addFile=(fileData,fileDispatch)=>{
    // var fileData={
    //     PK:"USER#12345",
    //     SK:"FILE#12345",
    //     LSI_PK:name,
    //     hash:hash,
    //     size:12,
    //     type:type,
    // }
    fileDispatch(fileStateUpdate(fileData))
}

export const loadFiles = async (fileDispatch) => {
    
    // var files =[
    //     {
    //         PK:"USER#123",
    //         SK:"FILE#454",
    //         LS1_SK:"File1",
    //         hash:"878",
    //         size:"12",
    //         type:"audio"
    //     },{
    //         PK:"USER#123",
    //         SK:"FILE#454",
    //         LS1_SK:"File2",
    //         hash:"879",
    //         size:"12",
    //         type:"audio"
    //     },{
    //         PK:"USER#123",
    //         SK:"FILE#454",
    //         LS1_SK:"File3",
    //         hash:"879",
    //         size:"0.04",
    //         type:"video"
    //     }
    // ]
    var userId = JSON.parse(localStorage.getItem("auth")).PK.substring(5);
    axios.get(
        `${process.env.REACT_APP_BACKENDURL}/user/${userId}/file`,
        {
            headers:{                                                
                'X-Api-Key':process.env.REACT_APP_APIKEY,                                                
            }
        }       
    ).then((response)=>{
        fileDispatch(fileStateADD(response.data.body.items))
    }, (error) => {
        console.log(error);
    })    
    
}

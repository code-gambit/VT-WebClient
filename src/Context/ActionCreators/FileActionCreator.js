import * as ActionTypes from '../ActionTypes'

export const fileStateLoading=()=>({
    type:ActionTypes.FILE_STATE_LOADING
})

export const fileStateFailed=()=>({
    type:ActionTypes.FILE_STATE_FAILED
})

export const fileStateADD=(fileData)=>({
    type:ActionTypes.FILE_STATE_UPDATE,
    payload:fileData
})

export const fileStateUpdate=(fileData)=>({
    type:ActionTypes.FILE_STATE_UPDATE,
    payload:fileData
})

export const addFile=(fileData,file_dispatch)=>{
    // var fileData={
    //     PK:"USER#12345",
    //     SK:"FILE#12345",
    //     LSI_PK:name,
    //     hash:hash,
    //     size:12,
    //     type:type,
    // }
    file_dispatch(fileStateUpdate(fileData))
}
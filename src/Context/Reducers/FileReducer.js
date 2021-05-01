import * as ActionTypes from '../ActionTypes';
export const fileReducer = (state,action) =>{
    switch(action.type){
        case ActionTypes.FILE_STATE_LOADING:
            return {...state, isLoading:true, errMess:null, files:[]};
        case ActionTypes.FILE_STATE_FAILED:
            return {...state, isLoading:false, errMess:action.payload, files:[]};
        case ActionTypes.FILE_STATE_ADD:
            return {...state, isLoading:false, errMess:null, files:action.payload};
        case ActionTypes.FILE_STATE_UPDATE:
            return {...state, isLoading:false, errMess:null, files:[...state.files,action.payload]};
    }
}
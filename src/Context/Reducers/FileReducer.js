import * as ActionTypes from '../ActionTypes';
export const fileReducer = (state,action) =>{
    switch(action.type){
        case ActionTypes.FILE_STATE_LOADING:
            return {...state, isLoading:true, errMess:null, files:[], currentPage:state.currentPage, lastEKMap:state.lastEKMap};
        case ActionTypes.FILE_STATE_FAILED:
            return {...state, isLoading:false, errMess:action.payload, files:[], currentPage:state.currentPage, lastEKMap:state.lastEKMap};
        case ActionTypes.FILE_STATE_ADD_FILES:
            return {...state, isLoading:false, errMess:null, files:action.payload, currentPage:state.currentPage, lastEKMap:state.lastEKMap};
        case ActionTypes.FILE_STATE_UPDATE_FILES:
            return {...state, isLoading:false, errMess:null, files:[...state.files,action.payload], currentPage:state.currentPage, lastEKMap:state.lastEKMap};
        case ActionTypes.FILE_STATE_UPDATE_CURRENT_PAGE:
            return {...state, isLoading:state.isLoading, errMess:null, files:state.files, currentPage:action.payload, lastEKMap:state.lastEKMap}
        case ActionTypes.FILE_STATE_ADD_LASTEK_MAP:
            return {...state, isLoading:state.isLoading, errMess:null, files:state.files, currentPage:state.currentPage, lastEKMap:action.payload}
        case ActionTypes.FILE_STATE_UPDATE_LASTEK_MAP:
            let temp=state.lastEKMap;
            let currentPage=action.payload.currentPage
            temp[currentPage]=action.payload.lastEvaluatedKey;
            return {...state, isLoading:state.isLoading, errMess:null, files:state.files, currentPage:state.currentPage, lastEKMap:temp}
        case ActionTypes.FILE_STATE_UPDATE_SEARCH_PARAM:
            return {...state, isLoading:state.isLoading, errMess:null, files:state.files, currentPage:state.currentPage, lastEKMap:state.lastEKMap, searchParam:action.payload};
    }
}
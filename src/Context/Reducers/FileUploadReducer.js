/* eslint-disable default-case */
import * as ActionTypes from '../ActionTypes';
export const fileUploadReducer = (state,action) =>{
    switch(action.type){
        case ActionTypes.FILE_UPLOAD_STATE_ADD_FILES:
            var temp = state.files;
            for(var i=0;i<action.payload.length;i++){
                temp.push(action.payload[i]);
            }
            return {...state, files: temp};
        case ActionTypes.FILE_UPLOAD_STATE_RESET_FILES:
            return {...state, files:[]}
        case ActionTypes.FILE_UPLOAD_STATE_UPDATE_FILE:
            var temp = state.files;
            for(var i=0;i<temp.length;i++){
                if(temp[i].id==action.payload.id){
                    temp[i] = action.payload;
                    break;
                }
            }
            return {...state, files: temp};
    }
}
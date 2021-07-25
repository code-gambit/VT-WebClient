import * as ActionTypes from '../ActionTypes';

export const fileUploadStateAddFiles=(fileArray)=>({
    type:ActionTypes.FILE_UPLOAD_STATE_ADD_FILES,
    payload:fileArray
})

export const fileUploadStateResetFiles = () => ({
    type: ActionTypes.FILE_UPLOAD_STATE_RESET_FILES
})

export const fileUploadStateUpdateFile = (fileData) => ({
    type: ActionTypes.FILE_UPLOAD_STATE_UPDATE_FILE,
    payload: fileData
})
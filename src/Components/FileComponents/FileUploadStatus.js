import React, { useContext, useEffect } from 'react';
import { FileUploadContext } from '../../Context/Contexts/FileUploadContext';
import getFileSize from '../../utils/fileSize';
import {UncontrolledTooltip} from 'reactstrap';
import getFileIconURL from '../../utils/fileIcon';
const img = {
    display: 'block',
    height: '50px',
    width: '50px'
};
const renderStatus = (status, URL, id) =>{
    if(status === "uploaded"){
        return(
            <div className="d-flex flex-row">
                <span className="fa fa-clipboard mx-2" role="button" 
                    onClick={() => {navigator.clipboard.writeText(process.env.REACT_APP_FRONTENDURL+"/"+URL)}}
                    id={"copyURL"+id}
                ></span>                          
                <UncontrolledTooltip placement="left" target={"copyURL"+id}>
                    Copy URL
                </UncontrolledTooltip>
                <span className="text-success">
                    <i className="fa fa-check-circle fa-lg"></i>
                </span>
            </div>
        )
    }
    else if(status === "uploading"){
        return(
            <div class="spinner-grow" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        )
    }
    else if(status === "error"){
        return(
            <span className="text-danger">
                <i class="fa fa-exclamation-circle fa-lg"></i>
            </span>
        )
    }
}
const thumbFile = (file) =>{
    return(
        <div className="d-flex justify-content-between align-items-center my-1">
            <img src={getFileIconURL(file.file_name)} style={img} alt="file"/>                  
            <span className="font-weight-bold">{file.file_name}</span>
            <div className="d-flex align-items-center">
                <span className="badge badge-info">{getFileSize(file.file_size)}</span>
                {renderStatus(file.file_status, file.default, file.id)}
            </div>
        </div>
    )
}
const FileUploadStatus = () => {
    const {fileUploadState} = useContext(FileUploadContext);
    const thumbs = fileUploadState.files.map(file => {
        return(
            thumbFile(file)
        )
    });
    return ( 
        <div>
            {thumbs}
        </div>
     );
}
 
export default FileUploadStatus;
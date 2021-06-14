import React, { useState, useCallback } from 'react';
import { Card,UncontrolledDropdown, DropdownMenu, 
    DropdownItem, DropdownToggle, Col} from 'reactstrap';
import {Link} from 'react-router-dom';
import getFileSize from '../../utils/fileSize';
import getDate from '../../utils/getDate';
import getFileIconURL from '../../utils/fileIcon';
import FileDelete from './FileDelete';
import FileShare from './FileShare';

const RenderFile = ({file}) => {
    const [toDelete, setToDelete] = useState(false);
    const [toShare, setToShare] = useState(false);
    const toggleToDelete = useCallback(() =>{
        setToDelete(!toDelete);
    },[toDelete])
    const toggleToShare = useCallback(() =>{
        setToShare(!toShare);
    },[toShare]);
    var fileId=file.SK.substring(5);
    var now = getDate(fileId);
    var file_size = getFileSize(file.size);
    var file_icon_url = getFileIconURL(file.LS1_SK);
    return(
        <Col className="p-2 col-12 col-sm-6 col-md-4 col-lg-3">
            <Card className="file-card-wrapper">
                <div className="card-body">
                    <UncontrolledDropdown className="float-right">
                        <DropdownToggle nav>
                            <i className="fa fa-ellipsis-v"></i>
                        </DropdownToggle>
                        <DropdownMenu>  
                            <DropdownItem onClick={()=>toggleToShare()}>
                                Share
                            </DropdownItem>
                            <DropdownItem onClick={()=>toggleToDelete()}>
                                Delete
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <div className="text-center pt-5">
                        <Link to={`/file/${fileId}`} className="text-decoration-none">
                            <img src={file_icon_url}/>
                            <p className="pt-3 file_title">{file.LS1_SK}</p>
                        </Link>
                        {window.location.pathname==`/file/${fileId}`?
                            <span>{now}</span>
                        :   
                            null
                        }
                    </div>
                    <hr/>
                    <div className="file_size_wrapper">
                        <span className="file_size_label">Filesize:</span>
                        <br/>
                        <span className="file_size">{file_size}</span>
                    </div>
                </div>
            </Card>
            {toDelete?
                <FileDelete isOpen={toDelete} fileId={fileId} toggleToDelete={toggleToDelete}/>
            :
                null
            }
            {toShare?
                <FileShare isOpen={toShare} fileId={fileId} fileHash={file.hash} toggleToShare={toggleToShare} />
            :
                null
            }
        </Col>
    )
}
export default React.memo(RenderFile);
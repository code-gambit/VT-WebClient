import React, { useState } from 'react';
import { Card, Button, CardTitle, CardText, Col, Tooltip,
    Modal,ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {Link} from 'react-router-dom';
import date from "date-and-time";
import axios from 'axios';
import { toast } from 'react-toastify';
import getFileSize from '../../utils/fileSize';

const crypto = require('crypto');

const RenderFile = ({file}) => {
    const [isFileViewMoreTipOpen,setIsFileViewMoreTipOpen] = useState(false);
    const code = (string) =>{        
        return crypto.createHash('sha1').update(string).digest('hex');
    }

    var fileId=file.SK.substring(5)
    var now=date.parse(fileId,'YYYY-MM-DD-hh-mm-ss');
    now=date.format(now, 'ddd, MMM DD, YYYY H:mm');
    var idTemp="id"+code(fileId)
    
    var file_size=getFileSize(file.size);
    return(
        <Col sm="6" className="p-2">
            <Link to={`/file/${fileId}`} className="text-decoration-none">
            <Card body className="file-card-wrapper">
                <div className="col-12">
                    <div className="float-left">
                        <CardTitle tag="h5">{file.LS1_SK}</CardTitle>
                    </div>
                </div>
                <div className="col-12">
                    <CardText>Created at: {now}
                        {/* <br/>
                        <span className="rounded-pill primary-text mr-1  file-type-badge">{file.f_type}</span>
                        <span className="rounded-pill primary-text ml-1  file-size-badge">{file_size}</span> */}
                    </CardText>                                          
                </div>  
            </Card>
            </Link>
        </Col>
    )
}
export default React.memo(RenderFile);
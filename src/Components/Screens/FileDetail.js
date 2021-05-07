import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col,
    Modal,ModalHeader, ModalBody, ModalFooter, Tooltip} from 'reactstrap';
import { useParams } from 'react-router';
import axios from 'axios';
import { Loading } from '../Loading';
import date from "date-and-time";
import { useHistory} from 'react-router-dom';
import { FileContext } from '../../Context/Contexts/FileContext';
import * as FileActionCreators from '../../Context/ActionCreators/FileActionCreator';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import URL from './URL';

const FileDetail = () => {
    const [fileId,setFileId] = useState(useParams().fileId);
    const [fileData,setFileData] = useState(undefined);
    const [isFileDeleteModalOpen,setIsFileDeleteModalOpen] = useState(false);
    const [isFileDeleteTipOpen,setIsFileDeleteTipOpen] = useState(false);        
    const [isURLDeleteModalOpen,setIsURLDeleteModalOpen] = useState(false);
    const history=useHistory()
    const {fileDispatch} = useContext(FileContext);

    useEffect(() =>{
        var userId = JSON.parse(localStorage.getItem("auth")).PK.substring(5);
        axios.get(
            `${process.env.REACT_APP_BACKENDURL}/user/${userId}/file/${fileId}`,
            {
                headers:{
                    'x-api-key':process.env.REACT_APP_APIKEY,
                }
            }
        ).then((response)=>{
            setFileData(response.data.body)
        }, (error) => {
            console.log(error);
        })
    },[])

    const toggleFileDeleteModal = () =>{
        setIsFileDeleteModalOpen(!isFileDeleteModalOpen);
    }
    const toggleFileDeleteTip = () =>{
        setIsFileDeleteTipOpen(!isFileDeleteTipOpen);
    }
    const fileDeleteUtil = () =>{        
        var userId = JSON.parse(localStorage.getItem("auth")).PK.substring(5);
        setFileData(undefined);
        axios.delete(
            `${process.env.REACT_APP_BACKENDURL}/user/${userId}/file/${fileId}`,
            {
                headers:{                                                
                    'X-Api-Key':process.env.REACT_APP_APIKEY,                                                
                }
            } 
        ).then((response)=>{                           
            FileActionCreators.loadFiles(fileDispatch); 
            toast.success(response.data.body)                      
            history.push('/files')            
        }, (error) => {
            history.push('/files')
            toast.error(error.message)            
        }) 
        toggleFileDeleteModal();        
    }

    function renderFile(file){
        var fileId=file.SK.slice(5);
        var now=date.parse(fileId,'YYYY-MM-DD-hh-mm-ss');
        now=date.format(now, 'ddd, MMM DD, YYYY H:mm');
        return(
            <Col sm="12" className="p-2">
                <Card body>
                    <div className="col-12">
                        <div className="float-left">
                            <CardTitle tag="h5">{file.LS1_SK}</CardTitle>
                        </div>
                        <div className="float-right">
                            <span className="rounded-pill primary-text mx-1 col-3 file-type-badge">{file.f_type}</span>
                            <span className="rounded-pill primary-text mx-1 col-3 file-size-badge">{file.size} MB</span>
                            <span className="fa fa-trash mx-1" role="button" onClick={(e)=>{toggleFileDeleteModal()}} id="FileDelete"></span>
                            <Tooltip placement="right" isOpen={isFileDeleteTipOpen} target="FileDelete" toggle={toggleFileDeleteTip}>
                                Delete File
                            </Tooltip>
                        </div>
                    </div>
                    <div className="col-12">
                        <CardText>Created at: {now}</CardText>
                    </div>
                </Card>
            </Col>
        )
    }

    return (
        <div className="container">                         
            <Modal isOpen={isFileDeleteModalOpen} toggle={toggleFileDeleteModal} className="modal-dialog-centered">
                <ModalHeader toggle={toggleFileDeleteModal}>Warning!</ModalHeader>
                <ModalBody>
                    Do want to delete the File?
                    <br/>
                    Note: It will also delete all URLs corresponding to the file.
                </ModalBody>
                <ModalFooter>
                    <Button className="secondary" onClick={toggleFileDeleteModal}>Close</Button>
                    <Button className="primary" onClick={fileDeleteUtil}>Delete</Button>
                </ModalFooter>
            </Modal>            
            <>{fileData!=undefined&&fileData.file_data!=undefined?
                <div>
                {renderFile(fileData.file_data)}
                <h2 className="text-center">URL List</h2>
                <>{fileData.url_data.items.length!=0?
                    <Row>
                    {fileData.url_data.items.map(url=>{
                        // return(
                        //     renderURL(url)
                        // )
                        return (
                            <URL url={url}/>
                        )
                    })}
                    </Row>
                :
                <h4 className="text-center">No URL available</h4>
                }</>

                </div>
            :    
                <Loading/>
                
            }</>
        </div>
     );
}

export default FileDetail;

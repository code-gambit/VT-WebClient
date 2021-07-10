import React, { useState } from 'react';
import { Button, Col, Modal, ModalHeader, 
    ModalBody, ModalFooter, UncontrolledTooltip} from 'reactstrap';
import { useParams } from 'react-router';
import axios from 'axios';
import { useHistory} from 'react-router-dom';
import date from "date-and-time";
import { toast } from 'react-toastify';
import getDate from '../../utils/getDate';
const crypto = require('crypto');

const URL = ({url,defaultURLId}) => {    
    const [fileId,setFileId] = useState(useParams().fileId);
    const [URLId, setURLId] = useState(url.SK.slice(4));
    const [isURLDeleteModalOpen,setIsURLDeleteModalOpen] = useState(false);
    const [isURLCopied, setIsURLCopied] = useState(false);
    const history=useHistory()
    const toggleURLDeleteModal = () =>{
        setIsURLDeleteModalOpen(!isURLDeleteModalOpen);
    }
    const URLDeleteUtil = () =>{
        axios.delete(
            `${process.env.REACT_APP_BACKENDURL}/file/${fileId}/url/${URLId}`,
            {
                headers:{                                                
                    'X-Api-Key':process.env.REACT_APP_APIKEY,                                                
                }
            }
        ).then((response)=>{       
            if(response.data.error || response.data.statusCode==500){
                toast.error(response.data.error);
                return;
            }                                 
            toast.success("URL deleted successfully");  
            setURLId(undefined);                  
            window.location.reload();
        }, (error) => {
            toast.error(error)  
            history.push('/files')                      
        }) 
        setIsURLDeleteModalOpen();
    }
    const URLUpdateUtil = (current_visibility) =>{        
        axios.put(
            `${process.env.REACT_APP_BACKENDURL}/file/${fileId}/url/${URLId}`,
            {visible:!current_visibility},
            {                
                headers:{                                                
                    'X-Api-Key':process.env.REACT_APP_APIKEY,                                                
                }
            }
        ).then((response)=>{      
            if(response.data.error || response.data.statusCode==500){
                toast.error(response.data.error);
                return;
            }                                 
            toast.success("URL Updated Successfully");  
            url.visible=!url.visible;   
            setURLId(undefined);
            setURLId(URLId);                        
        }, (error) => {            
            toast.error(error.message)  
            history.push('/files')                      
        }) 
    }
    const code = (string) =>{        
        return crypto.createHash('sha1').update(string).digest('hex');
    }
    var idTemp="id"+code(url.SK.substring(5));
    return (
        <>{URLId?
            <Col className="py-1" key={url.SK}>
                <div body className="card url-card-wrapper">
                    <div className="card-body">
                        <div tag="h5" className="d-flex justify-content-around card-title font-weight-bold">
                            <div className="w-100">
                                <a href={process.env.REACT_APP_FRONTENDURL+"/"+url.GS1_PK} 
                                    className="d-inline-block text-truncate mw-100"
                                >
                                    {process.env.REACT_APP_FRONTENDURL+"/"+url.GS1_PK}
                                </a>
                            </div>
                            {!isURLCopied?
                                <>
                                <span className="fa fa-clipboard mx-2" role="button" onClick={() => {
                                    navigator.clipboard.writeText(process.env.REACT_APP_FRONTENDURL+"/"+url.GS1_PK);
                                    setIsURLCopied(true);
                                }} id={"copyURL"+idTemp}></span>        
                                <UncontrolledTooltip placement="left" target={"copyURL"+idTemp}>
                                    Copy URL
                                </UncontrolledTooltip>
                                </>
                            :
                                <i class="fa fa-check-circle text-success"></i> 
                            }
                            
                            
                        </div>
                        {defaultURLId==url.GS1_PK?
                            <span class="badge badge-info">Default</span>
                        :
                            null
                        } 
                        <div className="d-flex card-text">
                            <div className="float-left">
                                <span>Clicks Left: {url.clicks_left}</span>
                                <br/>
                                <span>Created at: {getDate(url.SK.slice(4))}</span>
                            </div>
                            <div className="float-right col-1">
                                <span className="mx-1" role="button" onClick={(e)=>{URLUpdateUtil(url.visible)}} >{url.visible?
                                    <>
                                        <span className="fa fa-eye" id={"disableURL"+idTemp}></span>
                                        <UncontrolledTooltip placement="left" target={"disableURL"+idTemp}>
                                            Disable URL
                                        </UncontrolledTooltip>
                                    </>
                                :
                                    <>
                                        <span className="fa fa-eye-slash" id={"enableURL"+idTemp}></span>
                                        <UncontrolledTooltip placement="left" target={"enableURL"+idTemp}>
                                            Enable URL
                                        </UncontrolledTooltip>
                                    </>
                                }</span>
                                <span className="fa fa-trash mx-1" role="button" onClick={(e)=>{toggleURLDeleteModal()}} id={"deleteURL"+idTemp}></span>
                                <UncontrolledTooltip placement="left" target={"deleteURL"+idTemp}>
                                    Delete URL
                                </UncontrolledTooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>            
        :
            null
        }
        <Modal isOpen={isURLDeleteModalOpen} toggle={toggleURLDeleteModal} className="modal-dialog-centered">
            <ModalHeader toggle={toggleURLDeleteModal}>Warning!</ModalHeader>
            <ModalBody>
                {defaultURLId==url.GS1_PK?
                    <span>This is the default URL and can not be deleted.</span>
                :
                    <span>Do want to delete the URL?</span>
                }                                        
            </ModalBody>
            <ModalFooter>
                <Button className="secondary" onClick={toggleURLDeleteModal}>Close</Button>
                {defaultURLId==url.GS1_PK?
                    null
                :
                    <Button className="primary" onClick={URLDeleteUtil}>Delete</Button>
                }
            </ModalFooter>
        </Modal>
        </>      
        
    )
}

export default React.memo(URL);
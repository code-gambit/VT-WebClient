import React, { useState } from 'react';
import { Card, Button, CardTitle, CardText, Col,
    Modal,ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { useParams } from 'react-router';
import axios from 'axios';
import { useHistory} from 'react-router-dom';
import date from "date-and-time";
import { toast } from 'react-toastify';

const URL = ({url}) => {    
    const [fileId,setFileId] = useState(useParams().fileId);
    const [URLId, setURLId] = useState(url.SK.slice(4));
    const [isURLDeleteModalOpen,setIsURLDeleteModalOpen] = useState(false);
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
            toast.success(response.data.body);  
            setURLId(undefined);                  
            history.push(`/file/${fileId}`);            
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
            toast.success("URL Update Success");  
            url.visible=!url.visible;   
            setURLId(undefined);
            setURLId(URLId);                        
        }, (error) => {            
            toast.error(error.message)  
            history.push('/files')                      
        }) 
    }
    const getDate = (url_SK) =>{
        var urlId=url_SK.slice(4);
        var now=date.parse(urlId,'YYYY-MM-DD-hh-mm-ss');
        now=date.format(now, 'ddd, MMM DD, YYYY H:mm');
        return now;
    }    
    return (   
        <>{URLId?
                <Col sm="6" className="p-2" key={url.SK}>
                    <Card body className="url-card-wrapper">
                        <div className="col-12">
                            <div className="float-left">
                                <CardTitle tag="h5">
                                    <a href={process.env.REACT_APP_FRONTENDURL+"/"+url.GS1_PK}>{process.env.REACT_APP_FRONTENDURL+"/"+url.GS1_PK}</a>
                                    <span className="fa fa-clipboard mx-2" role="button" onClick={() => {navigator.clipboard.writeText(process.env.REACT_APP_FRONTENDURL+"/"+url.GS1_PK)}}></span>    
                                </CardTitle>
                            </div>
                            <div className="float-right">
                                <span className="mx-1" role="button" onClick={(e)=>{URLUpdateUtil(url.visible)}}>{url.visible?<span className="fa fa-eye"></span>:<span className="fa fa-eye-slash"></span>}</span>
                                {/* <span className="fa fa-edit mx-1"></span> */}
                                <span className="fa fa-trash mx-1" role="button" onClick={(e)=>{toggleURLDeleteModal()}}></span>
                            </div>
                        </div>
                        <div className="col-12">
                            <CardText>Clicks Left: {url.clicks_left}</CardText>
                            <CardText>Created at: {getDate(url.SK)}</CardText>
                        </div>
                    </Card>
                </Col>            
        :
            <div></div>
        }
        <Modal isOpen={isURLDeleteModalOpen} toggle={toggleURLDeleteModal} className="modal-dialog-centered">
            <ModalHeader toggle={toggleURLDeleteModal}>Warning!</ModalHeader>
            <ModalBody>
                Do want to delete the URL?                        
            </ModalBody>
            <ModalFooter>
                <Button className="secondary" onClick={toggleURLDeleteModal}>Close</Button>
                <Button className="primary" onClick={URLDeleteUtil}>Delete</Button>
            </ModalFooter>
        </Modal>
        </>      
        
     );
}
 
export default URL;
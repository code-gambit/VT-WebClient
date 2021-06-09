import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, 
    ModalFooter,} from 'reactstrap';
import axios from '../utils/axios';
import { toast } from 'react-toastify';
const FileShare = ({isOpen, fileId, fileHash, toggleToShare}) => {
    const [isFileShareModalOpen,setIsFileShareModalOpen] = useState(isOpen);
    const [isURLLinkModalOpen, setIsURLLinkModalOpen] = useState(false);
    const [URLVisibility,setURLVisibility] = useState(true);
    const [URLId,setURLId] = useState(undefined);
    const toggleFileShareModal = () =>{
        setIsFileShareModalOpen(!isFileShareModalOpen);
    }
    const toggleURLLinkModal = () =>{
        if(isURLLinkModalOpen==true){
            toggleToShare();
            if(!window.location.pathname=="/files"){
                window.location.reload();
            }
        }
        setIsURLLinkModalOpen(!isURLLinkModalOpen);
    }
    const shareFileUtil = ()=>{
        var URLData={
            hash:fileHash,
            visible:URLVisibility,
            clicks_left:50
        }
        axios.post(
            `${process.env.REACT_APP_BACKENDURL}/file/${fileId}/url`,URLData,
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
            toast.success("URL Generated Successfully");   
            setURLId(response.data.body.GS1_PK);
            toggleURLLinkModal();
            toggleFileShareModal();    
        }, (error) => {
            toast.error("Some error occured");
        })
        setURLVisibility(true);
    }
    return ( 
        <div>
            <Modal isOpen={isFileShareModalOpen} toggle={toggleFileShareModal} className="modal-dialog-centered">
                <ModalHeader toggle={toggleToShare}>Share File</ModalHeader>
                <ModalBody>
                    URL Visibility                        
                    <form>                            
                        <label>
                            <input type="radio" checked={!URLVisibility} onClick={()=>setURLVisibility(false)} />
                            Private 
                        </label>                            
                        <label className="ml-2">
                            <input type="radio" checked={URLVisibility} onClick={()=>setURLVisibility(true)}/>
                            Public
                        </label>                            
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={shareFileUtil}>
                        Create Link
                    </Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={isURLLinkModalOpen} toggle={toggleURLLinkModal} className="modal-dialog-centered">
                <ModalHeader toggle={toggleURLLinkModal}>Copy URL</ModalHeader>
                <ModalBody>  
                <a href={process.env.REACT_APP_FRONTENDURL+"/"+URLId}>{process.env.REACT_APP_FRONTENDURL+"/"+URLId}</a>
                <span className="fa fa-clipboard mx-2" role="button" onClick={() => {navigator.clipboard.writeText(process.env.REACT_APP_FRONTENDURL+"/"+URLId)}}></span>                          
                </ModalBody>                    
            </Modal>
        </div>
     );
}
export default React.memo(FileShare);
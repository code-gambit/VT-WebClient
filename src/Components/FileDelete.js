import React, { useState, useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, 
    ModalFooter,} from 'reactstrap';
import axios from '../utils/axios';
import { useHistory} from 'react-router-dom';
import { toast } from 'react-toastify';
import { FileContext } from '../Context/Contexts/FileContext';
import * as FileActionCreators from '../Context/ActionCreators/FileActionCreator';
const FileDelete = ({isOpen, fileId, toggleToDelete}) => {
    const [isFileDeleteModalOpen,setIsFileDeleteModalOpen] = useState(isOpen);
    const history=useHistory();
    const {fileDispatch} = useContext(FileContext);
    const toggleFileDeleteModal = () =>{
        setIsFileDeleteModalOpen(!isFileDeleteModalOpen);
        toggleToDelete();
    }
    const fileDeleteUtil = () =>{
        var userId = JSON.parse(localStorage.getItem("auth")).PK;
        axios.delete(
            `${process.env.REACT_APP_BACKENDURL}/user/${userId}/file/${fileId}`,
            {
                headers:{                                                
                    'X-Api-Key':process.env.REACT_APP_APIKEY,                                                
                }
            } 
        ).then((response)=>{                                        
            if(response.data.error){
                toast.error(response.data.error);
                return;
            }
            toast.success("File Deleted Successfully")          
            FileActionCreators.loadFiles(fileDispatch,1,undefined,undefined,undefined);        
            history.push('/files')
        }, (error) => {
            history.push('/files')
            toast.error(error.message)            
        })
        toggleFileDeleteModal();    
    }
    return ( 
        <div>
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
        </div>
     );
}
export default React.memo(FileDelete);
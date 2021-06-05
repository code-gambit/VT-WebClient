import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col,
    Modal,ModalHeader, ModalBody, ModalFooter, Tooltip,
    Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import { useParams } from 'react-router';
import axios from '../../utils/axios';
import { Loading } from '../Loading';
import date from "date-and-time";
import { useHistory} from 'react-router-dom';
import { FileContext } from '../../Context/Contexts/FileContext';
import * as FileActionCreators from '../../Context/ActionCreators/FileActionCreator';
import { toast } from 'react-toastify';
import URL from './URL';
import getFileSize from '../../utils/fileSize';

const FileDetail = () => {
    const [fileId,setFileId] = useState(useParams().fileId);
    const [fileData,setFileData] = useState(undefined);
    const [URLData,setURLData] = useState(undefined);
    const [isFileDeleteModalOpen,setIsFileDeleteModalOpen] = useState(false);
    const [isFileDeleteTipOpen,setIsFileDeleteTipOpen] = useState(false);    
    const [currentPage,setCurrentPage] = useState(1);
    const [lastEKMap,setLastEKMap] = useState({0:undefined});
    const [isFileShareTipOpen, setIsFileShareTipOpen] = useState(false);
    const [isFileShareModalOpen,setIsFileShareModalOpen] = useState(false);
    const [isURLLinkModalOpen, setIsURLLinkModalOpen] = useState(false);
    const [URLVisibility,setURLVisibility] = useState(true);
    const [URLId,setURLId] = useState("");
    const history=useHistory()
    const {fileDispatch} = useContext(FileContext);

    useEffect(() =>{
        const userId = JSON.parse(localStorage.getItem("auth")).PK;
        axios.get(
            `${process.env.REACT_APP_BACKENDURL}/user/${userId}/file/${fileId}`,
            {
                headers:{
                    'x-api-key':process.env.REACT_APP_APIKEY,
                }
            }
        ).then((response)=>{   
            if(response.data.error || response.data.statusCode==500){
                toast.error(response.data.error);
                return;
            }         
            setFileData(response.data.body.file_data);
            setURLData(response.data.body.url_data.items);
            updateLastEKMap(currentPage,response.data.body.url_data.LastEvaluatedKey);
        }, (error) => {
            console.log(error);
        })
    },[])

    useEffect(() => {
        window.scrollTo({behavior: 'smooth', top: '0px'});
        axios.get(
            `${process.env.REACT_APP_BACKENDURL}/file/${fileId}/url`,
            {   
                params:{LastEvaluatedKey:lastEKMap[currentPage-1]},
                headers:{
                    'x-api-key':process.env.REACT_APP_APIKEY,
                }
            }
        ).then((response)=>{
            if(response.data.error){
                toast.error(response.data.error);
                return;
            }
            setURLData(response.data.body.items);
            updateLastEKMap(currentPage,response.data.body.LastEvaluatedKey);            
        }, (error) => {
            console.log(error);
        })
    },[currentPage])

    const updateLastEKMap = (key,value) =>{        
        setLastEKMap({});
        var temp = lastEKMap;
        temp[key]=value;
        setLastEKMap(temp);
    }

    function goToNextPage(){
        setCurrentPage(currentPage+1);        
    }
    function goToPreviousPage(){
        setCurrentPage(currentPage-1);
    }

    const toggleFileDeleteModal = () =>{
        setIsFileDeleteModalOpen(!isFileDeleteModalOpen);
    }
    const toggleFileDeleteTip = () =>{
        setIsFileDeleteTipOpen(!isFileDeleteTipOpen);
    }
    const toggleFileShareTip = () =>{
        setIsFileShareTipOpen(!isFileShareTipOpen);
    }
    const toggleFileShareModal = () =>{
        setIsFileShareModalOpen(!isFileShareModalOpen);
    }
    const toggleURLLinkModal = () =>{
        if(isURLLinkModalOpen==true){
            window.location.reload();
        }
        setIsURLLinkModalOpen(!isURLLinkModalOpen);
    }
    const fileDeleteUtil = () =>{        
        var userId = JSON.parse(localStorage.getItem("auth")).PK;
        setFileData(undefined);
        axios.delete(
            `${process.env.REACT_APP_BACKENDURL}/user/${userId}/file/${fileId}`,
            {
                headers:{                                                
                    'X-Api-Key':process.env.REACT_APP_APIKEY,                                                
                }
            } 
        ).then((response)=>{                           
            FileActionCreators.loadFiles(fileDispatch,1,undefined,undefined,undefined); 
            if(response.data.error){
                toast.error(response.data.error);
                return;
            }
            toast.success(response.data.body)                      
            history.push('/files')            
        }, (error) => {
            history.push('/files')
            toast.error(error.message)            
        }) 
        toggleFileDeleteModal();        
    }
    const shareFileUtil = ()=>{
        var URLData={
            hash:fileData.hash,
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
            toggleFileShareModal();    
            toggleURLLinkModal();
        }, (error) => {
            toast.error("Some error occured");
        })
        setURLVisibility(true);
    }
    function renderFile(file){
        var fileId=file.SK.slice(5);
        var now=date.parse(fileId,'YYYY-MM-DD-hh-mm-ss');
        now=date.format(now, 'ddd, MMM DD, YYYY H:mm');
        return(
            <Col sm="12" className="p-2">
                <Card body className="file-detail-card-wrapper">
                    <div className="col-12">
                        <div className="float-left">
                            <CardTitle tag="h5">{file.LS1_SK}</CardTitle>
                        </div>
                        <div className="float-right">
                            <span className="badge badge-warning mx-2">{file.f_type}</span>
                            <span className="badge badge-warning">{getFileSize(file.size)}</span>                            
                        </div>
                    </div>
                    <div>
                        <div className="float-left col-12 col-sm-8">
                            <CardText>Created at: {now}</CardText>
                        </div>
                        <div className="float-right col-12 col-sm-2 text-center">
                            <span role="button" className="px-2 fa fa-share-alt" onClick={toggleFileShareModal} id="ShareFile"></span>     
                            <Tooltip placement="right" isOpen={isFileShareTipOpen} target="ShareFile" toggle={toggleFileShareTip}>
                                Share File
                            </Tooltip> 
                            <span className="px-2 fa fa-trash mx-1" role="button" onClick={(e)=>{toggleFileDeleteModal()}} id="FileDelete"></span>
                            <Tooltip placement="right" isOpen={isFileDeleteTipOpen} target="FileDelete" toggle={toggleFileDeleteTip}>
                                Delete File
                            </Tooltip>
                        </div>
                    </div>
                </Card>
            </Col>
        )
    }

    return (
        <div className="container">                         
                      
            <>{fileData!=undefined && fileData!=undefined?
                <div>                    
                    {renderFile(fileData)}
                    <h2 className="text-center">URL List</h2>
                    <>{URLData!=undefined && URLData.length!=0?
                        <div className="col-12">
                            <Row>
                                {URLData.map(url=>{
                                    return (
                                        <URL url={url}/>
                                    )
                                })}
                            </Row>                            
                            <div className="d-flex justify-content-center">
                                <Pagination aria-label="File Pagination">
                                    <PaginationItem>
                                        <PaginationLink onClick={goToPreviousPage} disabled={lastEKMap[currentPage-1]?false:true}>
                                            prev
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink onClick={goToNextPage} disabled={lastEKMap[currentPage]?false:true}>
                                            next
                                        </PaginationLink>
                                    </PaginationItem>                               
                                </Pagination>
                            </div>
                        </div>                
                    :
                    <h4 className="text-center">No URL available</h4>
                    }</>
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
                    <Modal isOpen={isFileShareModalOpen} toggle={toggleFileShareModal} className="modal-dialog-centered">
                        <ModalHeader toggle={toggleFileShareModal}>Share File {fileData.LS1_SK}</ModalHeader>
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
            :   
                <Loading/>             
            }</>
        </div>
     );
}

export default FileDetail;

import React, { useContext, useEffect, useState } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col,
    Modal,ModalHeader, ModalBody, 
    Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { FileContext } from '../../Context/Contexts/FileContext';
import * as FileActionCreators from '../../Context/ActionCreators/FileActionCreator';
import FileForm from './FileForm';
import RenderFile from './RenderFile';
import { Loading } from '../Loading';

const Files = () => {
    const {fileState,fileDispatch} = useContext(FileContext);
    const [isFileFormOpen,setIsFileFormOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(fileState.currentPage);
    const [lastEKMap, setLastEKMap] = useState(fileState.lastEKMap);
    useEffect(()=>{
        FileActionCreators.loadFiles(fileDispatch,fileState.currentPage,fileState.lastEKMap[currentPage-1]);        
    },[])

    useEffect(() => {
        window.scrollTo({ behavior: 'smooth', top: '0px' });
        fileDispatch(FileActionCreators.fileStateUpdateCurrentPage(currentPage));
        FileActionCreators.loadFiles(fileDispatch,currentPage,fileState.lastEKMap[currentPage-1]);        
    }, [currentPage]);

    useEffect(()=>{
        setCurrentPage(fileState.currentPage);
        setLastEKMap(fileState.lastEKMap);        
    },fileState)
    
    const toggleFileFormModal = ()=>{
        setIsFileFormOpen(!isFileFormOpen)        
    }
    function goToNextPage(){        
        setCurrentPage(fileState.currentPage+1);                  
    }
    function goToPreviousPage(){
        setCurrentPage(fileState.currentPage-1);        
    }


    return (
        <div className="container">
            <h3 className="text-center">Your Files</h3>
            Current Page: {fileState.currentPage}
            <Button onClick={toggleFileFormModal}>Add File</Button>
            <Modal isOpen={isFileFormOpen} toggle={toggleFileFormModal} className="modal-dialog-centered">
                <ModalHeader toggle={toggleFileFormModal}>File Form</ModalHeader>
                <ModalBody>
                    <FileForm toggleFileFormModal={toggleFileFormModal} setCurrentPage={setCurrentPage}/>
                </ModalBody>
            </Modal>
            <div>    
                <>{fileState.files.length!=0?
                    <Row>
                        {fileState.files.map(file=>{
                            return(
                                RenderFile(file)
                            )
                        })}                
                    </Row>
                :
                    <Loading/>
                }</>            
                
            </div>
            <div className="d-flex justify-content-center">                
                <Pagination aria-label="File Pagination">
                    <PaginationItem>
                        <PaginationLink onClick={goToPreviousPage} disabled={fileState.lastEKMap[fileState.currentPage-1]?false:true}>
                            prev
                        </PaginationLink>
                    </PaginationItem>                    
                    {/* {getPaginationGroup().map((item, index) => (
                        <PaginationItem>
                            <PaginationLink onClick={changePage}>
                                {item}
                            </PaginationLink>
                        </PaginationItem>
                    ))}    */}
                    <PaginationItem>
                        <PaginationLink onClick={goToNextPage} disabled={fileState.lastEKMap[fileState.currentPage]?false:true}>
                            next
                        </PaginationLink>
                    </PaginationItem>                               
                </Pagination>
            </div>
        </div>

     );
}

export default Files;

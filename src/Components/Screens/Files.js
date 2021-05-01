import React, { useContext, useEffect, useState } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col,
    Modal,ModalHeader, ModalBody } from 'reactstrap';
import { FileContext } from '../../Context/Contexts/FileContext';
import * as FileActionCreators from '../../Context/ActionCreators/FileActionCreator'
import FileForm from './FileForm';

function renderFile(file){    
    return(
        <Col sm="6" className="p-2">
            <Card body>
                <div className="col-12">
                    <div className="float-left">
                        <CardTitle tag="h5">{file.LS1_SK}</CardTitle>
                    </div>
                    <div className="float-right">
                        <span className="rounded-pill primary-text mx-1 col-3 file-type-badge">{file.type}</span>
                        <span className="rounded-pill primary-text mx-1 col-3 file-size-badge">{file.size} MB</span>
                    </div>
                </div> 
                <div className="col-12">
                    <CardText>Created at: {file.SK}</CardText>
                    <Button>Details</Button>
                </div>                   
            </Card>
        </Col>
    )
}

const Files = () => {
    const {fileState,fileDispatch} = useContext(FileContext);
    const [isFileFormOpen,setIsFileFormOpen] = useState(false);
    // useEffect(()=>{        
    //     FileActionCreators.loadFiles(fileDispatch);
    // },[])

    const toggleFileFormModal = ()=>{
        setIsFileFormOpen(!isFileFormOpen)
    }
    return ( 
        <div className="container">
            <div>
                Total Files: {fileState.files.length}
            </div>
            <Button onClick={toggleFileFormModal}>Add File</Button>
            <Modal isOpen={isFileFormOpen} toggle={toggleFileFormModal}>
                <ModalHeader toggle={toggleFileFormModal}>File Form</ModalHeader>
                <ModalBody>
                    <FileForm/>
                </ModalBody>
            </Modal>
            <Row>
                {fileState.files.map(file=>{
                    return(
                        renderFile(file)
                    )
                })}            
            </Row>
        </div>
     );
}
 
export default Files;
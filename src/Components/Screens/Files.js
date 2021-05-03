import React, { useContext, useEffect, useState } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col,
    Modal,ModalHeader, ModalBody } from 'reactstrap';
import { FileContext } from '../../Context/Contexts/FileContext';
import FileForm from './FileForm';
import {Link} from 'react-router-dom';
import date from "date-and-time"

function renderFile(file){
    const fileId=file.SK.substring(5)
    var now=date.parse(fileId,'YYYY-MM-DD-hh-mm-ss');
    now=date.format(now, 'ddd, MMM DD, YYYY H:mm');
    return(
        <Col sm="6" className="p-2" key={file.SK}>
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
                    <CardText>Created at: {now}</CardText>
                    <Link to={`/file/${fileId}`} className="text-decoration-none">
                        <Button>Details</Button>
                    </Link>
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

                <>{fileState.files.length!=0 ?
                <Row>
                    {fileState.files.map(file=>{
                        return(
                            renderFile(file)
                        )
                    })}
                </Row>
                :<div></div>
            }</>

        </div>
     );
}

export default Files;

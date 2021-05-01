import React, { useContext, useState } from 'react';
import * as FileActionCreators from '../../Context/ActionCreators/FileActionCreator';
import { FileContext } from '../../Context/Contexts/FileContext';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { AuthContext } from '../../Context/Contexts/AuthContext';

const FileForm = () => {
    const {fileDispatch} = useContext(FileContext)
    const {authState} = useContext(AuthContext);
    const [name,setName] = useState("");
    const [hash,setHash] = useState("");
    const [type,setType] = useState("");
    const [file,setFile] = useState("");
    const handleSubmit = (e)=>{
        e.preventDefault();
        var fileData={
            PK:authState.auth.PK,
            SK:"FILE#12345",
            LS1_SK:name,
            hash:"123456",
            size:12,
            type:type,
        }
        FileActionCreators.addFile(fileData,fileDispatch);
        setName("");
        setHash("");
        setType("");
        setFile("");
        //window.location.reload(false);    //enable this when not using mock data
    }
    return ( 
        // <form onSubmit={handleSubmit}>
        //     <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="File Name"/>
        //     <input type="text" value={hash} onChange={(e)=>{setHash(e.target.value)}} placeholder="File Hash"/>
        //     <input type="text" value={type} onChange={(e)=>{setType(e.target.value)}} placeholder="File Type"/>
        //     <input type="submit" placeholder="Add File"/>
        // </form>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="fileName">File Name</Label>
                <Input type="text" name="email" id="fileName" value={name} placeholder="File Name" 
                    onChange={(e) => {setName(e.target.value)}}
                />
            </FormGroup>
            <FormGroup>
                <Label for="selectFileType">Select File Type</Label>
                <Input type="select" name="select" id="selectFileType" value={type} onChange={(e) => {setType(e.target.value)}}>
                    <option>Document</option>
                    <option>Audio</option>
                    <option>Media</option>
                    <option>PDF</option>
                    <option>Other</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="file">Choose File</Label>
                <Input type="file" name="file" id="file" onChange={(e) => {setFile(e.target.files[0])}} />
                <FormText color="muted">
                    Any file uploaded will be added in IPFS server
                </FormText>
            </FormGroup>
            <Button>Submit</Button>
        </Form>
     );
}
 
export default FileForm;
import React, { useContext, useState } from 'react';
import * as FileActionCreators from '../../Context/ActionCreators/FileActionCreator';
import * as AuthActionCreators from '../../Context/ActionCreators/AuthActionCreater';
import { FileContext } from '../../Context/Contexts/FileContext';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { AuthContext } from '../../Context/Contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

if((typeof TextDecoder==='undefined' || typeof TextEncoder==='undefined') && typeof require!=='undefined'){
    global.TextDecoder = require('util').TextDecoder
    global.TextEncoder = require('util').TextEncoder
}
const ipfs=require("ipfs-http-client")
const client=ipfs({host:'ipfs.infura.io',port:5001,protcol:'https'})

const FileForm = ({toggleFileFormModal,setCurrentPage}) => {
    const {fileDispatch} = useContext(FileContext)
    const {authState} = useContext(AuthContext);
    const [name,setName] = useState(undefined);    
    const [type,setType] = useState(undefined);    
    const [file,setFile] = useState(undefined);    
    const [isUploading,setIsUploading] = useState(false);

    async function getBuffer(file){
        const reader=new window.FileReader();
        return new Promise((resolve,reject)=>{
          reader.readAsArrayBuffer(file);
          reader.onloadend= async ()=>{
            const buffer= await Buffer(reader.result)
            resolve(buffer);
          }
        })
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(name==undefined){
            toast.warning("Please give your file a name");
            return;
        }
        if(file==undefined){
            toast.warning("Please select a file");
            return;
        }
        if(type==undefined){
            toast.warning("Please select file type");
            return;
        }        
        setIsUploading(true);
        const buffer= await getBuffer(e.target[2].files[0])
        const res=await client.add(buffer)
        const fileSize=(e.target[2].files[0].size)/1000;    // storing size in KBs.
        var fileData={
            f_type:e.target[1].value,
            hash:res.path,
            size:parseFloat(fileSize.toFixed(3)),
            LS1_SK: e.target[0].value
        }
        const userId = JSON.parse(localStorage.getItem("auth")).PK.substring(5);
        axios.post(
            `${process.env.REACT_APP_BACKENDURL}/user/${userId}/file`, fileData,
            {
                headers:{
                    'X-Api-Key':process.env.REACT_APP_APIKEY,
                },

            }
        ).then((response)=>{                                    
            toast.success("File upload success");
            toggleFileFormModal()
            authState.auth.storage_used+=fileData.size
            authState.auth.storage_used=parseFloat(authState.auth.storage_used.toFixed(4))
            AuthActionCreators.authStateUpdate(authState);
            localStorage.setItem("auth",JSON.stringify(authState.auth))             
            fileDispatch(FileActionCreators.fileStateUpdateCurrentPage(1));
            fileDispatch(FileActionCreators.fileStateAddLastEKMap({}));
            FileActionCreators.loadFiles(fileDispatch,1);      
            setCurrentPage(1);        
        }, (error) => {
            toast.error(error.message);
        })
        setName("");        
        setType("");
        setFile("");
        setIsUploading(false);
    }
    return ( 
        <>{!isUploading?
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
            :
            <div className="text-center">
                <span className="fa fa-spinner fa-pulse fa-3x fa-fw"></span>
                <p>Uploading</p>
                
            </div>
        }</>
        
     );
}
 
export default FileForm;
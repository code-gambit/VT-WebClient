import React, { useContext, useState } from 'react';
import * as FileActionCreators from '../../Context/ActionCreators/FileActionCreator';
import * as AuthActionCreators from '../../Context/ActionCreators/AuthActionCreater';
import { FileContext } from '../../Context/Contexts/FileContext';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { AuthContext } from '../../Context/Contexts/AuthContext';
import axios from 'axios'

if((typeof TextDecoder==='undefined' || typeof TextEncoder==='undefined') && typeof require!=='undefined'){
  global.TextDecoder = require('util').TextDecoder
  global.TextEncoder = require('util').TextEncoder
}

const ipfs=require("ipfs-http-client")
const client=ipfs({host:'ipfs.infura.io',port:5001,protcol:'https'})

const FileForm = () => {
    const {fileDispatch} = useContext(FileContext)
    const {authState} = useContext(AuthContext);
    const [name,setName] = useState("");
    const [hash,setHash] = useState("");
    const [type,setType] = useState("");
    const [file,setFile] = useState("");
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
        const buffer=await getBuffer(e.target[2].files[0])
        const res=await client.add(buffer)
        const fileSize=(e.target[2].files[0].size)/1048576
        var fileData={
          f_type:e.target[1].value,
          hash:res.path,
          size:parseFloat(fileSize.toFixed(4)),
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
            setFile(response.data.body)
            FileActionCreators.addFile(fileData,fileDispatch);
            authState.auth.storage_used+=fileData.size
            authState.auth.storage_used=parseFloat(authState.auth.storage_used.toFixed(4))
            AuthActionCreators.authStateUpdate(authState)
        }, (error) => {
            console.log(error);
        })
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

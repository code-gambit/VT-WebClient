import React, { useContext, useState, useEffect } from 'react';
import * as FileActionCreators from '../../Context/ActionCreators/FileActionCreator';
import * as AuthActionCreators from '../../Context/ActionCreators/AuthActionCreater';
import { FileContext } from '../../Context/Contexts/FileContext';
import { AuthContext } from '../../Context/Contexts/AuthContext';
import { FileUploadContext } from '../../Context/Contexts/FileUploadContext';
import * as FileUploadActionCreators from '../../Context/ActionCreators/FileUploadActionCreater';
import axios from '../../utils/axios';
import { toast } from 'react-toastify';
import {useDropzone} from 'react-dropzone';
import getFileType from '../../utils/fileType';
import { v4 as uuidv4 } from 'uuid';
if((typeof TextDecoder==='undefined' || typeof TextEncoder==='undefined') && typeof require!=='undefined'){
    global.TextDecoder = require('util').TextDecoder
    global.TextEncoder = require('util').TextEncoder
}
const ipfs=require("ipfs-http-client")
const client=ipfs({host:'ipfs.infura.io',port:5001,protcol:'https'})


const baseStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "30vh",
    background: "linear-gradient(-45deg, #8e9eab, #eef2f3,  #6dd5fa, #ffffff)",
    animation: "gradient 15s ease infinite",
    backgroundSize: "400% 400%",
    borderRadius:"10px",
    border: "2px dashed #00ccff"
};
const img = {
    display: 'block',
    height: '50px',
    width: '50px'
};
const FileForm = ({setCurrentPage, toggleFileFormModal, toggleFileUploadStatusModal}) => {
    const {fileState, fileDispatch} = useContext(FileContext);
    const {fileUploadDispatch} = useContext(FileUploadContext);
    const {authState} = useContext(AuthContext);
    const [files,setFiles] = useState([]);    
    useEffect(()=>{
        series(files[0],0);
    },[files])

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
    const series = (file,index) =>{
        if(file){
            toggleFileFormModal();
            toggleFileUploadStatusModal();
            handleSubmit(file,index,()=>{
                series(files[index+1],index+1);
            });
        }
        else if(files.length!=0){
            var isAllErrorFree = true;
            for(var i = 0; i<files.length; i++){
                if(files[i].file_status=="error"){
                    isAllErrorFree = false;
                    break;
                }
            }
            if(isAllErrorFree){
                if(files.length==1){
                    toast.success("File Uploaded Successfully");
                }
                else{
                    toast.success("Files Uploaded Successfully");
                }
            }
            fileDispatch(FileActionCreators.fileStateUpdateCurrentPage(1));
            fileDispatch(FileActionCreators.fileStateAddLastEKMap({}));  
            fileDispatch(FileActionCreators.updateEndDate(undefined));
            fileDispatch(FileActionCreators.updateStartDate(undefined));
            FileActionCreators.loadFiles(fileDispatch,1,undefined,fileState.searchParam);      
            setCurrentPage(1);
        }
    }
    const handleSubmit = async (file,i,callback)=>{        
        try{
            if(file==undefined){
                throw new Error("Invalid File")
            }
            const buffer= await getBuffer(file) 
            const res=await client.add(buffer)
            var fileData={
                f_type:file.file_type,
                hash:res.path,
                size:parseFloat(file.file_size.toFixed(3)),
                LS1_SK: file.file_name
            }
            const userId = JSON.parse(localStorage.getItem("auth")).PK;
            const response  = await axios.post(`${process.env.REACT_APP_BACKENDURL}/user/${userId}/file`, fileData,{
                headers:{
                        'X-Api-Key':process.env.REACT_APP_APIKEY,
                }});
            if(response.data.error){
                throw new Error(response.data.error);
            }
            file.file_status = "uploaded";
            file.default = response.data.body.default;
            fileUploadDispatch(FileUploadActionCreators.fileUploadStateUpdateFile(file))
            authState.auth.storage_used+=fileData.size
            authState.auth.storage_used=parseFloat(authState.auth.storage_used.toFixed(4))
            AuthActionCreators.authStateUpdate(authState);
            localStorage.setItem("auth",JSON.stringify(authState.auth));
            callback();
        } catch(err){
            toast.error(err.message);
            file.status = "error";
            fileUploadDispatch(FileUploadActionCreators.fileUploadStateUpdateFile(file))
            callback();
        }
    }


    const {getRootProps,getInputProps} = useDropzone({
        onDrop: acceptedFiles => {
            const fileData = acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file),
                file_type: getFileType(file.name),
                file_name: file.name,
                file_size: file.size,
                file_status: "uploading",
                file_id: uuidv4()
            }))
            fileUploadDispatch(FileUploadActionCreators.fileUploadStateAddFiles(fileData));
            setFiles(fileData);
            
        }
    });
    return ( 
        <div className="text-center">   
            <div {...getRootProps({style:baseStyle})}>
                <input {...getInputProps()} />                
                <div className="">
                    <img src="https://res.cloudinary.com/code-gambit/image/upload/v1621421198/Web%20App/file_40x40_sea3kj.png"/>
                    <br></br>
                    <p>Drag and Drop your files here</p>
                </div>
            </div>
        </div>
        
     );
}
 
export default React.memo(FileForm);
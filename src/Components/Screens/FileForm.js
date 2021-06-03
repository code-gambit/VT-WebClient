import React, { useContext, useState, useEffect } from 'react';
import * as FileActionCreators from '../../Context/ActionCreators/FileActionCreator';
import * as AuthActionCreators from '../../Context/ActionCreators/AuthActionCreater';
import { FileContext } from '../../Context/Contexts/FileContext';
import { AuthContext } from '../../Context/Contexts/AuthContext';
import axios from '../../utils/axios';
import { toast } from 'react-toastify';
import {useDropzone} from 'react-dropzone';
import getFileSize from '../../utils/fileSize';
import getFileType from '../../utils/fileType';

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
const FileForm = ({setCurrentPage}) => {
    const {fileState, fileDispatch} = useContext(FileContext)
    const {authState} = useContext(AuthContext);
    const [files,setFiles] = useState([]);    
    const [isDragActive, setIsDragActive] = useState(true);
    useEffect(()=>{
        series(files[0],0);
    },[files])
    const setStatus = (index, status, URL=undefined) =>{
        const temp = files;
        temp[index].file_status = status;
        if(URL){
            temp[index].default = process.env.REACT_APP_FRONTENDURL+"/"+URL;
        }
        setFiles(temp);
    }
    const renderStatus = (status, URL) =>{
        if(status=="uploaded"){
            return(
                <>
                <span className="fa fa-clipboard mx-2" role="button" onClick={() => {navigator.clipboard.writeText(URL)}}></span>                          
                <span className="text-success">
                    <i className="fa fa-check-circle fa-lg"></i>
                </span>
                </>
            )
        }
        else if(status=="uploading"){
            return(
                <div class="spinner-grow" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            )
        }
        else if(status=="error"){
            return(
                <span className="text-danger">
                    <i class="fa fa-exclamation-circle fa-lg"></i>
                </span>
            )
        }
    }
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
            setIsDragActive(false);
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
                    toast.success("All File Uploaded");
                }
                else{
                    toast.success("All Files Uploaded");
                }
            }
            fileDispatch(FileActionCreators.fileStateUpdateCurrentPage(1));
            fileDispatch(FileActionCreators.fileStateAddLastEKMap({}));  
            fileDispatch(FileActionCreators.updateEndDate(undefined));
            fileDispatch(FileActionCreators.updateStartDate(undefined));
            FileActionCreators.loadFiles(fileDispatch,1,undefined,fileState.searchParam);      
            setCurrentPage(1);
            setIsDragActive(true);
        }
    }
    const handleSubmit = async (file,i,callback)=>{        
        const index=i
        
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
            setStatus(index, "uploaded", response.data.body.default);
            authState.auth.storage_used+=fileData.size
            authState.auth.storage_used=parseFloat(authState.auth.storage_used.toFixed(4))
            AuthActionCreators.authStateUpdate(authState);
            localStorage.setItem("auth",JSON.stringify(authState.auth));
            callback();
        } catch(err){
            toast.error(err.message);
            setStatus(index, "error");
            callback();
        }
    }


    const {getRootProps,getInputProps} = useDropzone({
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file),
                file_type: getFileType(file.name),
                file_name: file.name.split('.')[0],
                file_size: file.size/1000,
                file_status: "uploading"
            })));
        }
    });
    const thumbFile = (file) =>{
        return(
            <div className="d-flex justify-content-between align-items-center">
                <div className="p-1 d-flex flex-row align-items-center">
                    <img src={file.preview} style={img} alt="file"/>            
                    <span>
                        <span className="px-2 font-weight-bold text-monospace">{file.file_name}</span>    
                        <span className="badge badge-info">{getFileSize(file.file_size)}</span>                
                    </span>
                </div>
                <span>
                    {renderStatus(file.file_status, file.default)}
                </span>
            </div>
        )
    }
    const thumbs = files.map(file => {
        return(
            thumbFile(file)
        )
    });
    return ( 
        <div className="text-center">   
            {isDragActive?         
                <div {...getRootProps({style:baseStyle})}>
                    <input {...getInputProps()} />                
                    <div className="">
                        <img src="https://res.cloudinary.com/code-gambit/image/upload/v1621421198/Web%20App/file_40x40_sea3kj.png"/>
                        <br></br>
                        <p>Drag and Drop your files here</p>
                    </div>
                </div>
            :
                ""
            }  
            <div>
                
                {thumbs}
            </div>
        </div>
        
     );
}
 
export default FileForm;
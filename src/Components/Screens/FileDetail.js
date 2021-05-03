import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col} from 'reactstrap';
import { useParams } from 'react-router';
import axios from 'axios';
import { Loading } from '../Loading';

function renderFile(file){    
    return(
        <Col sm="12" className="p-2">
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
                </div>                   
            </Card>
        </Col>
    )
}

function renderURL(url){    
    return(
        <Col sm="12" className="p-2" key={url.SK}>
            <Card body>
                <div className="col-12">
                    <div className="float-left">
                        <CardTitle tag="h5">www.dummyURL/{url.GS1_PK}.com</CardTitle>
                    </div>
                    <div className="float-right">
                        <span className="mx-1">{url.visible?<span className="fa fa-eye"></span>:<span className="fa fa-eye-slash"></span>}</span>    
                        <span className="fa fa-edit mx-1"></span>
                        <span className="fa fa-trash mx-1"></span>
                    </div>
                </div> 
                <div className="col-12">
                    <CardText>Clicks Left: {url.clicks_left}</CardText>
                    <CardText>Created at: {url.SK}</CardText>
                </div>                   
            </Card>
        </Col>
    )
}


const FileDetail = () => {
    const [fileId,setFileId] = useState(useParams().fileId);
    const [fileData,setFileData] = useState(undefined);
    useEffect(() =>{        
        var userId = JSON.parse(localStorage.getItem("auth")).PK.substring(5);
        axios.get(
            `${process.env.REACT_APP_BACKENDURL}/user/${userId}/file/${fileId}`,
            {
                headers:{                                                
                    'x-api-key':process.env.REACT_APP_APIKEY,                                                
                }
            }       
        ).then((response)=>{
            setFileData(response.data.body)
        }, (error) => {
            console.log(error);
        })          
    },[])
    return ( 
        <div className="container">            
            {/* {JSON.stringify(fileData)} */}
            <>{fileData!=undefined&&fileData.file_data!=undefined?                
                <div>
                {renderFile(fileData.file_data)}
                <h2 className="text-center">URL List</h2>
                <>{fileData.url_data.items.length!=0?
                    <Row>
                    {fileData.url_data.items.map(url=>{
                        return(
                            renderURL(url)
                        )
                    })}
                    </Row>
                :
                <h4 className="text-center">No URL available</h4>
                }</>
                
                </div>
            :
                <div className="text-center">                    
                    <Loading/>
                </div>
            }</>           
        </div>
     );
}
 
export default FileDetail;
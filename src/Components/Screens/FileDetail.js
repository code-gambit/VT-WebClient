import React, { useState, useEffect } from 'react';
import { Row, Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import { useParams } from 'react-router';
import axios from '../../utils/axios';
import { Loading } from '../Loading';
import { toast } from 'react-toastify';
import URL from '../FileComponents/URLCard';
import RenderFile from '../FileComponents/FileCard';

const FileDetail = () => {
    const [fileId,setFileId] = useState(useParams().fileId);
    const [currentPage,setCurrentPage] = useState(1);
    const [lastEKMap,setLastEKMap] = useState({0:undefined});
    const [file, setFile] = useState(null);
    const [URLList, setURLList] = useState([]);
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
            setFile(response.data.body.file_data);
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
            setURLList(response.data.body.items);
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
    return (
        <div className="container">
            {file?
                <div className="py-2 col-12">
                    <Row className="justify-content-center">
                        <RenderFile file={file}/>
                        <div className="p-2 col-12 col-sm-12 col-md-8 col-lg-9">
                            <h5 className="text-center">File URLs</h5>
                            {URLList.map(url=>{
                                return (
                                    <URL url={url} defaultURLId={file.default}/>
                                )
                            })}
                            <div className="d-flex justify-content-center">
                                <Pagination aria-label="File Pagination">
                                    <PaginationItem>
                                        <PaginationLink onClick={goToPreviousPage} disabled={lastEKMap[currentPage-1]?false:true}>
                                            <i class="fa fa-arrow-left"></i>
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink onClick={goToNextPage} disabled={lastEKMap[currentPage]?false:true}>
                                            <i class="fa fa-arrow-right"></i>
                                        </PaginationLink>
                                    </PaginationItem>                               
                                </Pagination>
                            </div>
                        </div>
                    </Row>
                </div>
            :
                <Loading/>                
            }
        </div>
     );
}
FileDetail.whyDidYouRender = true;
export default FileDetail;
import React, { useContext, useEffect, useState} from 'react';
import { Row, Modal, ModalHeader, ModalBody, 
    Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { FileContext } from '../../Context/Contexts/FileContext';
import { FileUploadContext } from '../../Context/Contexts/FileUploadContext';
import * as FileActionCreators from '../../Context/ActionCreators/FileActionCreator';
import FileForm from '../FileComponents/FileForm';
import RenderFile from '../FileComponents/FileCard';
import { Loading } from '../Loading';
import FileDateFilter from '../FileComponents/FileDateFilter';
import FileUploadStatus from '../FileComponents/FileUploadStatus';
const FileList = () => {
    const {fileState,fileDispatch} = useContext(FileContext);
    const {fileUploadState} = useContext(FileUploadContext);
    const [isFileFormOpen,setIsFileFormOpen] = useState(false);
    const [isFileDateFilterOpen, setIsFileDateFilterOpen] = useState(false);
    const [isFileUploadStatusModalOpen, setIsFileUploadStatusModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(fileState.currentPage);
    const [lastEKMap, setLastEKMap] = useState(fileState.lastEKMap);
    const [searchParam,setSearchParam] = useState(undefined);

    useEffect(() => {        
        window.scrollTo({ behavior: 'smooth', top: '0px' });
        fileDispatch(FileActionCreators.fileStateUpdateCurrentPage(currentPage));
        FileActionCreators.loadFiles(fileDispatch,currentPage,fileState.lastEKMap[currentPage-1],fileState.searchParam,fileState.startDate,fileState.endDate);
    }, [currentPage]);
    
    const handleSearchParamFilter = (searchParam) =>{
        if(currentPage==1){
            FileActionCreators.loadFiles(fileDispatch,1,undefined,searchParam, fileState.startDate,fileState.endDate);
        }
        else{
            setCurrentPage(1)
        }
        fileDispatch(FileActionCreators.updateSearchParam(searchParam));        
        fileDispatch(FileActionCreators.fileStateAddLastEKMap({}));
    }

    const clearDateFilter = () =>{
        if(currentPage==1){
            fileDispatch(FileActionCreators.fileStateUpdateCurrentPage(1));
            FileActionCreators.loadFiles(fileDispatch,1,undefined,searchParam, undefined, undefined);
        }
        setCurrentPage(1)     
        fileDispatch(FileActionCreators.updateEndDate(undefined));
        fileDispatch(FileActionCreators.updateStartDate(undefined));
        fileDispatch(FileActionCreators.fileStateAddLastEKMap({}));
    }

    const toggleFileFormModal = ()=>{
        setIsFileFormOpen(!isFileFormOpen);
    }
    const toggleFileDateFilterModal = () =>{
        setIsFileDateFilterOpen(!isFileDateFilterOpen);
    }
    const toggleFileUploadStatusModal = () => {
        setIsFileUploadStatusModalOpen(!isFileUploadStatusModalOpen);
    }
    function goToNextPage(){
        setCurrentPage(fileState.currentPage+1);                  
    }
    function goToPreviousPage(){
        setCurrentPage(fileState.currentPage-1);        
    }

    const renderFilters = () =>{
        if(fileState.startDate&&fileState.endDate){
            return(
                <div className="align-items-center">
                    <span className="badge badge-warning" type="button" onClick={clearDateFilter}>
                        Clear Filter
                        <i className="fa fa-times fa-sm"></i>
                    </span>
                </div>
            )
        }
        else{
            return(
                <div className="d-flex justify-content-between align-items-center">
                    {!fileState.searchParam?
                        <>
                        <div type="button" onClick={toggleFileDateFilterModal}>
                            <i class="fa fa-calendar fa-lg"></i>
                        </div>            
                        <div className="search px-2">
                            <input type="text" className="searchTerm" placeholder="Find File By Name" onChange={(e)=>setSearchParam(e.target.value)}/>
                            <button type="submit" className="searchButton" onClick={()=>{
                                handleSearchParamFilter(searchParam)
                            }}>
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                        </>
                    :
                        <div className="search px-2">
                            <input type="text" className="searchTerm" placeholder={searchParam?searchParam:"Find File By Name"} onChange={(e)=>setSearchParam(e.target.value)} readOnly/>
                            <button type="submit" className="searchButton" onClick={()=>{
                                setSearchParam(undefined);
                                handleSearchParamFilter(undefined);
                            }}>
                                <i className="fa fa-times"></i>
                            </button>
                        </div>
                    }
                    
                </div> 
            )   
        }
    }

    const renderData = () =>{
        const renderFiles = () =>{
            return (
                <div>
                    {fileState.files.length==0?
                        <div className="text-center" type="button" onClick={toggleFileFormModal}>
                            <i class="fa fa-folder-open fa-lg"></i>
                            <p>Upload Some Files</p>
                        </div>
                    :
                        <Row className="px-5">
                            {fileState.files.map(file=>{
                                return(
                                    <RenderFile file={file} key={file.SK}/>
                                )
                            })}
                        </Row>
                    }   
                </div>
            )
        }
        if(fileState.isLoading){
            return(
                <Loading/>
            )
        }
        else if(fileState.searchParam){
            return(
                <div>
                    <div className="text-center">
                        Showing Results for{" "}
                        <span className="badge badge-secondary font-weight-bold">                            
                            {fileState.searchParam}
                        </span>
                    </div>
                    {renderFiles()}
                </div>
            )
        }
        else if(fileState.startDate&&fileState.endDate){
            return(
                <div>
                    <div className="text-center">
                        Showing Results for{" "}
                        <span className="badge badge-secondary font-weight-bold">                            
                        {fileState.startDate} - {fileState.endDate}
                        </span>
                    </div>
                    {renderFiles()}
                </div>
            )
        }
        else{
            return(
                <div>
                    {renderFiles()}
                </div>
            )
        }
    }
    return (
        <div className="container">
            <h3 className="text-center pt-2">YOUR FILES</h3>
            <div className="d-flex justify-content-between align-items-center p-2">                
                <div className="d-flex justify-content-between col-3">
                    <div type="button" onClick={toggleFileFormModal}>
                        <i class="fa fa-plus fa-lg"></i>
                    </div> 
                    {fileUploadState.files.length>0?
                        <div type="button" onClick={toggleFileUploadStatusModal}>
                            <i class="fa fa-upload"></i>
                        </div>
                    :
                        ""
                    } 
                </div>
                <div>
                    {renderFilters()}
                </div>                                                                                         
            </div>
            <Modal isOpen={isFileFormOpen} toggle={toggleFileFormModal} className="modal-dialog-centered">
                {/* <ModalHeader toggle={toggleFileFormModal}>Upload your files</ModalHeader>                 */}
                <ModalBody className="text-center modal-wrapper">
                    <FileForm 
                        setCurrentPage = {setCurrentPage} 
                        toggleFileFormModal = {toggleFileFormModal}
                        toggleFileUploadStatusModal = {toggleFileUploadStatusModal}
                    />
                </ModalBody>
            </Modal>
            <Modal isOpen={isFileDateFilterOpen} toggle={toggleFileDateFilterModal}>
                <ModalHeader toggle={toggleFileDateFilterModal}>Filter By Date</ModalHeader>
                <ModalBody>
                    <div className="text-center">
                        <FileDateFilter toggle={toggleFileDateFilterModal}/>
                    </div>
                </ModalBody>
            </Modal> 
            <Modal isOpen={isFileUploadStatusModalOpen} toggle={toggleFileUploadStatusModal} className="modal-dialog-centered">
                <ModalHeader toggle={toggleFileUploadStatusModal}>File Uploads</ModalHeader>
                <ModalBody className="text-center modal-wrapper">
                    <FileUploadStatus/>
                </ModalBody>
            </Modal>
            <div>
                {renderData()}
            </div>

            {!(fileState.isLoading||fileState.files.length==0)?
                <div className="text-center">
                    <div className="d-flex justify-content-center">                
                        <Pagination aria-label="File Pagination">
                            <PaginationItem>
                                <PaginationLink onClick={goToPreviousPage} disabled={fileState.lastEKMap[fileState.currentPage-1]?false:true}>
                                    <i class="fa fa-arrow-left"></i>
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink onClick={goToNextPage} disabled={fileState.lastEKMap[fileState.currentPage]?false:true}>
                                    <i class="fa fa-arrow-right"></i>
                                </PaginationLink>
                            </PaginationItem>                               
                        </Pagination>
                    </div>
                    <span>Showing Page: <span className="badge badge-dark">{fileState.currentPage}</span></span>    
                </div>
            :
                null
            }
        </div>

     );
}
FileList.whyDidYouRender = true
export default React.memo(FileList);

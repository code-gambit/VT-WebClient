const getFileSize = (file_size) =>{
    if(file_size>=1024*1024*1024){
        return  Math.round(file_size/(1024*1024*1024))+" GB";
    }
    else if(file_size>=1024*1024){
        return  Math.round(file_size/(1024*1024))+" MB";
    }
    else if(file_size>1024){
        return Math.round(file_size/1024)+" KB";
    }
    else{
        return Math.ceil(file_size/1024)+" KB";
    }
}
export default getFileSize;
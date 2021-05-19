const getFileSize = (file_size) =>{
    if(file_size>=1024*1024){
        return  (file_size/1024).toFixed(2)+" GB";
    }
    else if(file_size>=1024){
        return  (file_size/1024).toFixed(2)+" MB";
    }
    else if(file_size>1){
        return (file_size).toFixed(2)+" KB";
    }
    else{
        return (file_size).toFixed(3)+" KB";
    }
}
export default getFileSize;
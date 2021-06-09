const image_extensions=["ai","bmp","gif","ico","jpeg","jpg","png","ps","psd","svg","tif","tiff"];
const video_extensions=["3g2","3gp","avi","flv","h264","m4v","mkv","mov","mp4","mpg","mpeg","rm","swf","vob","wmv"];
const audio_extensions=["aif","cda","mid","midi","mp3","mpa","ogg","wav","wma","wpl"];
const document_extensions=["doc","docx","odt",,"rtf","tex","txt","wpd"];
const pdf_extension=["pdf"];
const getFileType = (file_extension) => {  
    file_extension=file_extension.split('.').pop();
    if(image_extensions.includes(file_extension)) return "Image";
    else if(video_extensions.includes(file_extension)) return "Video";
    else if(audio_extensions.includes(file_extension)) return "Audio";
    else if(document_extensions.includes(file_extension)) return "Document";
    else if(pdf_extension.includes(file_extension)) return "PDF";
    else return "Other";
}
 
export default getFileType;
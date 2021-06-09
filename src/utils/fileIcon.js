const getFileIconURL = (file_extension) =>{
    file_extension = file_extension.split('.').pop();
    file_extension = file_extension.toLowerCase();
    if(file_extension == "exe") return "https://res.cloudinary.com/code-gambit/image/upload/v1623177973/Web%20App/File%20Icons/exe_qsg6wq.png";
    else if(file_extension == "js") return "https://res.cloudinary.com/code-gambit/image/upload/v1623177972/Web%20App/File%20Icons/javascript_ge93xz.png";
    else if(file_extension == "html") return "https://res.cloudinary.com/code-gambit/image/upload/v1623177972/Web%20App/File%20Icons/html_wcmfkk.png";
    else if(file_extension == "doc" || file_extension == "docx") return "https://res.cloudinary.com/code-gambit/image/upload/v1623177971/Web%20App/File%20Icons/doc_f2tlh5.png";
    else if(file_extension == "csv") return "https://res.cloudinary.com/code-gambit/image/upload/v1623177971/Web%20App/File%20Icons/csv_opypxx.png";
    else if(file_extension == "pdf") return "https://res.cloudinary.com/code-gambit/image/upload/v1623177971/Web%20App/File%20Icons/pdf_rt1145.png";
    else if(file_extension == "mp4") return "https://res.cloudinary.com/code-gambit/image/upload/v1623177970/Web%20App/File%20Icons/mp4_bzh3gq.png";
    else if(file_extension == "mp3") return "https://res.cloudinary.com/code-gambit/image/upload/v1623177970/Web%20App/File%20Icons/mp3_hqms8f.png";
    else if(file_extension == "txt") return "https://res.cloudinary.com/code-gambit/image/upload/v1623177970/Web%20App/File%20Icons/txt_xwjmfs.png";
    else if(file_extension == "zip") return "https://res.cloudinary.com/code-gambit/image/upload/v1623177970/Web%20App/File%20Icons/zip_bjnt9y.png";
    else if(file_extension == "json") return "https://res.cloudinary.com/code-gambit/image/upload/v1623177969/Web%20App/File%20Icons/json-file_dwuutw.png";
    else if(file_extension == "css") return "https://res.cloudinary.com/code-gambit/image/upload/v1623177969/Web%20App/File%20Icons/css_wss2ax.png";
    else if(file_extension == "jpg") return "https://res.cloudinary.com/code-gambit/image/upload/v1623177969/Web%20App/File%20Icons/jpg_tgoot0.png";
    else if(file_extension == "png") return "https://res.cloudinary.com/code-gambit/image/upload/v1623177969/Web%20App/File%20Icons/png_r4vqaq.png";
    else if(file_extension == "xml") return "https://res.cloudinary.com/code-gambit/image/upload/v1623177969/Web%20App/File%20Icons/xml_ezupea.png";
    else if(file_extension == "pptx" || file_extension == "ppt") return "https://res.cloudinary.com/code-gambit/image/upload/v1623177968/Web%20App/File%20Icons/ppt_hfuaqi.png";
    else if(file_extension == "xls") return "https://res.cloudinary.com/code-gambit/image/upload/v1623177968/Web%20App/File%20Icons/xls_nc9mhv.png";
    else return "https://res.cloudinary.com/code-gambit/image/upload/v1623177971/Web%20App/File%20Icons/file_pa1udc.png";
}
export default getFileIconURL;
import DownloadFile from "@components/DownloadFile";
import DropZoneComponent from "@components/DropZoneComponent";
import EmailForm from "@components/EmailForm";
import RenderFile from "@components/RenderFile";
import axios from "axios";
import { FileUploadStatus } from "libs/utils";
import { useState } from "react";

export default function Home() {
  const [file,setFile] = useState(null);
  const [id,setId] = useState(null);
  const [downloadPageLink,setDownloadPageLink] = useState(null);
  const [uploadState,setUploadState] = useState<FileUploadStatus>(FileUploadStatus.UPLOAD);
  const handleUpload = async() => {
      if(uploadState === FileUploadStatus.UPLOADING) return;
      const formData = new FormData();
      formData.append('myFile',file);
      try {
        setUploadState(FileUploadStatus.UPLOADING);
        const {data} = await axios({
          method:"post",
          data:formData,
          url:'api/files/upload',
          headers:{
            'Content-Type' : 'multipart/form-data'
          }
        })
        setDownloadPageLink(data.downloadPageLink);
        setId(data.id);
        setUploadState(FileUploadStatus.UPLOADED);
      } catch (error) {
        console.error(error);
        setUploadState(FileUploadStatus.UPLOADFAILED);
      }
  }
  const resetState = () => {
    setFile(null);
    setDownloadPageLink(null);
    setUploadState(FileUploadStatus.UPLOAD);
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-4 text-3xl font-medium">Got a File Spread it like fake News!!!</h1>
      <div className="flex flex-col w-96 items-center bg-gray-800 shadow-xl rounded-xl justify-center ">
      {!downloadPageLink && <DropZoneComponent setFile={setFile} />}
      {file && <RenderFile file={{
        format: file.type.split('/')[1],
        name: file.name,
        size: file.size
      }}/>}
      {!downloadPageLink && file && <button disabled={uploadState === FileUploadStatus.UPLOADING} className="button" onClick={handleUpload} >{uploadState}</button>}
      {downloadPageLink && 
      <div className="p-2 text-center">
          <DownloadFile downloadPageLink={downloadPageLink} />
          <EmailForm id={id} />
          <button onClick={resetState} className="button">Upload New File</button>
        </div>} 
      </div>
     
    </div>
  );
}

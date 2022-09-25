import React, { Dispatch, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const DropZoneComponent: React.FC<{setFile:Dispatch<any>}> = ({ setFile }) => {
  const onDrop = useCallback((acceptedFile) => {
    console.log(acceptedFile);
    setFile(acceptedFile[0]);
  },[])
  const { getRootProps, getInputProps,isDragAccept,isDragReject } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg", "jpg"],
      "audio/mpeg": [".mp3", ".mpeg"],
      "text/plain": [".txt"],
    },
  });
  let borderClass = "border-yellow-light";
  if(isDragAccept){
    borderClass = 'border-green-500';
  } else if(isDragReject) {
    borderClass = 'border-red-500';
  }
  return (
    <div className='p-4 w-full'>
      <div {...getRootProps()} className="h-80 w-full rounded-md cursor-pointer focus:outline-none">
        <input {...getInputProps()} />

        <div className={`flex h-full text-center flex-col items-center justify-center border-2 border-dashed rounded-xl space-y-3 ${borderClass}`}>

          <img src="/images/folder.png" alt="folder" className='h-16 w-16'/>
          {
          isDragReject ? 
          <p className='mt-2 text-base tex-gray-800'>Only jpeg, png & mp3 files are supported</p> : 
            <div>
              <p>Drag & Drop Files Here</p>
              <p className='mt-2 text-base tex-gray-800'>Only jpeg, png & mp3 files are supported</p>
            </div>
          }

        </div>
      </div>
    </div>
  )
}

export default DropZoneComponent
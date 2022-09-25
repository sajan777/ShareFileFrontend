import { IFileProps } from 'libs/types'
import { sizeInMb } from 'libs/utils'
import React from 'react'



const RenderFile:React.FC<{file: IFileProps}> = ({file}) => {
  return (
    <div className='flex items-center w-full p-4 my-2'>
        <img src={`/images/${file.format}.png`} className='w-14 h-14' alt="file" />
        <span className='mx-2'>{file.name}</span>
        <span className='ml-auto'>{sizeInMb(file.size)}</span>
    </div>
  )
}

export default RenderFile
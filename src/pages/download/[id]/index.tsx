import RenderFile from '@components/RenderFile'
import axios from 'axios'
import { IFileProps } from 'libs/types'
import { GetServerSidePropsContext, NextPage } from 'next'
import React from 'react'
import fileDownload from 'js-file-download';

const index:NextPage<{ file: IFileProps }> = ({ file: { name,format,size,id } }) => {

    const handleDownloadFile = async () => {
       const {data} = await axios.get(`api/files/${id}/download`,{
            responseType: 'blob'
        });
        fileDownload(data,name);
    }

  return (
    <div className='flex flex-col items-center justify-center py-3 space-y-4 bg-gray-800 rounded-md shadow-xl w-96'>
        {!id ? <span>OOPS! File doesn't exist!</span> : 
            <><img src="/images/file-download.png" alt="image" className='w-16 h-16' /><h1 className='text-xl'>Your file is ready to be downloaded</h1><RenderFile file={{ format, name, size }} /><button className='button' onClick={handleDownloadFile}>Download</button></>
        }
    </div>
  )
}

export default index


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {id} = context.query;
    let file = {};
    try {
        const {data} = await axios.get(`${process.env.API_BASE_ENDPOINT}api/files/${id}`)
        file = data;
    } catch (error) {
        console.log(error);
    }
    return {
        props: {
            file
        }
    }
}
import axios from 'axios';
import React, { useState } from 'react'

const EmailForm:React.FC<{
    id: string
}> = ({ id }) => {

  const [emailFrom,setEmailFrom] = useState(null);
  const [emailTo,setEmailTo] = useState(null);
  const [message,setMessage] = useState(null);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    try {
        const {data} = await axios({
            method:'POST',
            url:'api/files/email',
            data:{
                id,
                emailFrom,
                emailTo
            }
        });
        setMessage(data.message);
    } catch (error) {
        console.error(error);
        setMessage(error.data.response.message);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center w-full p-2 space-y-3'>
        <h3>You can send the file through mail</h3>
        <form onSubmit={handleSendEmail} className='flex flex-col items-center justify-center w-full p-2 space-y-3'>
            <input type="email" placeholder='Email From' required onChange={e => setEmailFrom(e.target.value)} value={emailFrom} className='p-1 text-white bg-gray-800 border-2 focus:outline-none'/>
            <input type="email" placeholder='Email To' required onChange={e => setEmailTo(e.target.value)} value={emailTo} className='p-1 text-white bg-gray-800 border-2 focus:outline-none'/>
            <button  className='button' type='submit'>Send</button>
        </form>
        {
            message && <p className='font-medium text-red-500'>{message}</p>
        }
    </div>
  )
}

export default EmailForm
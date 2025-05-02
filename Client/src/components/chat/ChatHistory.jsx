import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { chatHistory } from '../../atoms/chatAtom'

function ChatHistory() {
    const [history] = useAtom(chatHistory)
    const [filteredHistory , setFilteredHistory] = useState([history])

    useEffect(()=>{
        const filtered = (history.filter((val) => typeof val==='string'))
        setFilteredHistory((prev) => [...prev , filtered])
        console.log("Filtered History: ", filteredHistory)
    } , [history])

  return (
    <>
    {filteredHistory && filteredHistory.length > 0 ? 
    (filteredHistory.map((val , index)=>(
        <div key={index} className='w-[40%] h-[2rem] bg-green-700 text-white'>
            <p className='font-medium'>{val}</p>
        </div>
    ))) : <p>No messages Yet..</p>}
    </>
  )
}

export default ChatHistory
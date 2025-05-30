import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useAtom } from 'jotai';
import { personalChatHistory } from '../../atoms/chatAtom.js';
import { chat } from '../../auth_api/chat.auth.js';
import { friendChattingWithData } from '../../atoms/friendAtom.js';
  const PersonalChatHistory = forwardRef((_ , ref)=>{

  useImperativeHandle(ref , ()=>({messageHandler}))

  const [friendData] = useAtom(friendChattingWithData)
  const [filteredHistory, setFilteredHistory] = useAtom(personalChatHistory);

  const messageHandler = (msg) => {
    console.log("message got triggerd" , msg)
    setFilteredHistory([...filteredHistory , msg])
  }

  const fetchData = async () => {
   try {
     const response = await chat.fetchPersonalMessage(friendData)
     const value = response.map((val) => val.content)
     console.log("Value ar fetchData" , value)
     setFilteredHistory([...value])
   } catch (error) {
    console.log("Error while fetching data" , error)
   }
  }

  useEffect(() => {
    fetchData()
  }, [friendData]);

  return (
    <>
      {filteredHistory.length > 0 ? (
        filteredHistory.map((val, index) => (
          <div key={index} className='w-[90%]   h-[2rem] text-2xl text-white'>
            <p className='font-medium '>{val}</p><br />
          </div>
        ))
      ) : (
        <p>No messages Yet..</p>
      )}
    </>
  );
})

export default PersonalChatHistory;

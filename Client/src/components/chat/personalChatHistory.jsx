import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { personalChatHistory } from '../../atoms/chatAtom.js';
import { chat } from '../../auth_api/chat.auth.js';
import { friendChattingWithData } from '../../atoms/friendAtom.js';
function PersonalChatHistory() {
  const [friendData ] = useAtom(friendChattingWithData)
  const [filteredHistory, setFilteredHistory] = useAtom(personalChatHistory);

  const fetchData = async () => {
    const response = await chat.fetchPersonalMessage(friendData)
    const value = response.map((val) => val.content)
    console.log(value)
    setFilteredHistory([...value])
  }

  useEffect(()=>{

  },[setFilteredHistory])

  useEffect(() => {
    fetchData()
  }, [friendData]);

  return (
    <>
      {filteredHistory.length > 0 ? (
        filteredHistory.map((val, index) => (
          <div key={index} className='w-[90%] h-[2rem] text-2xl text-white'>
            <p className='font-medium 3xl '>{val}</p>
          </div>
        ))
      ) : (
        <p>No messages Yet..</p>
      )}
    </>
  );
}

export default PersonalChatHistory;

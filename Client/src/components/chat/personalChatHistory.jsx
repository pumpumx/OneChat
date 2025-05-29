import React, { useEffect,useState } from 'react';
import { useAtom } from 'jotai';
import { personalChatHistory } from '../../atoms/chatAtom.js';
import { chat } from '../../auth_api/chat.auth.js';
import { friendChattingWithData } from '../../atoms/friendAtom.js';
function PersonalChatHistory() {
  const [friendData] = useAtom(friendChattingWithData)
  const [isSenderme , setIsSenderMe] = useState(true)

  const [filteredHistory, setFilteredHistory] = useAtom(personalChatHistory);

    const fetchData = async  ()=>{
    console.log("User at persoHistory" , friendData)
    const response = await chat.fetchPersonalMessage(friendData)
    console.log("res " , response)

    const value = response.map((val)=>val.content)
    console.log(value)
    setFilteredHistory([...value])
  }

  useEffect(() => {
    fetchData()
  }, [friendData] , );

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

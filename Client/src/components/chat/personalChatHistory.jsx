import React, { useEffect,useState } from 'react';
import { useAtom } from 'jotai';
import { personalChatHistory } from '../../atoms/chatAtom.js';
function PersonalChatHistory() {
  const [chatHistory] = useAtom(personalChatHistory)
  const [filteredHistory, setFilteredHistory] = useState([]);

  useEffect(() => {    
    setFilteredHistory([...chatHistory]); // No nested arrays
  }, [chatHistory]);

  return (
    <>
      {filteredHistory.length > 0 ? (
        filteredHistory.map((val, index) => (
          <div key={index} className='w-[100%] h-[2rem] text-9xl text-white'>
            <p className='font-medium text-9xl '>{val}</p>
          </div>
        ))
      ) : (
        <p>No messages Yet..</p>
      )}
    </>
  );
}

export default PersonalChatHistory;

import React, { useEffect, useState } from 'react';
import { getUserFromLocalStorage, setChatHistory } from '../../auth/localStorage.user';
import { useAtom } from 'jotai';
import { chatHistory } from '../../atoms/chatAtom.js';
import { userAtom } from '../../atoms/atom.js';

function ChatHistory() {
  const [chatHistoryAtom] = useAtom(chatHistory);
  const [filteredHistory, setFilteredHistory] = useState([]);
  console.log("hist" , chatHistoryAtom)


  useEffect(() => {
    setFilteredHistory([...chatHistoryAtom]); // No nested arrays
  }, [chatHistoryAtom]);

  useEffect(() => {
    setChatHistory(filteredHistory); // Save to localStorage
  }, [filteredHistory]);

  return (
    <>
      {filteredHistory.length > 0 ? (
        filteredHistory.map((val, index) => (
          <div key={index} className='w-[40%] h-[2rem] text-white'>
            <p className='font-medium'> : {val}</p>
          </div>
        ))
      ) : (
        <p>No messages Yet..</p>
      )}
    </>
  );
}

export default ChatHistory;

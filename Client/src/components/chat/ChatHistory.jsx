import React, { useEffect,useState } from 'react';
import { setChatHistory } from '../../auth_api/localStorage.user.js';
import { useAtom } from 'jotai';
import { chatHistory } from '../../atoms/chatAtom.js';
function ChatHistory() {
  const [chatHistoryAtom] = useAtom(chatHistory);
  const [filteredHistory, setFilteredHistory] = useState([]);
  console.log("hist" , chatHistoryAtom)
  useEffect(() => {
    //Run that function here
    setFilteredHistory([...chatHistoryAtom]); // No nested arrays
  }, [chatHistoryAtom]);

  useEffect(() => {
    setChatHistory(filteredHistory); // Save to localStorage  
  }, [filteredHistory]);

  return (
    <>
      {filteredHistory.length > 0 ? (
        filteredHistory.map((val, index) => (
          <div key={index} className='w-[100%] h-[2rem] text-white'>
            <p className='font-medium'>{val}</p>
          </div>
        ))
      ) : (
        <p>No messages Yet..</p>
      )}
    </>
  );
}

export default ChatHistory;

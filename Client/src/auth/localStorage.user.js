const getUserFromLocalStorage = ()=>{

    const userStore = localStorage.getItem("userDetails")

      try {
        if(userStore!=null){
          const parsedUser = JSON.parse(userStore);
          console.log("User at getUserFromLocalStorage:", parsedUser);
          return parsedUser.message.resUser;
        } 
        return false
      } catch (e) {
        console.error("Invalid user in localStorage", e);
        return null;
      }
  }
  
  const setUserToLocalStorage = (userDetails)=>{
      const setUserValue = JSON.stringify(userDetails)
      console.log("Local Storage Set Value" , setUserValue)
      localStorage.setItem("userDetails" , setUserValue)
  }

  const setChatHistory = (chatHistory) => {
    const setChatHistory = JSON.stringify(chatHistory)
    localStorage.setItem("chatHistory" , setChatHistory)
  }

  const getChatHistory = () => {
    try {
      const chatHistory = localStorage.getItem("chatHistory")
      const parseHistory = JSON.parse(chatHistory)
      return parseHistory
    } catch (error) {
        console.log("Error while getting chat history" , error)
    }
  }

  export {
    getUserFromLocalStorage,
    setUserToLocalStorage,
    setChatHistory,
    getChatHistory
  }
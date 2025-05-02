const  getUserFromLocalStorage = ()=>{
    const userStore = localStorage.getItem("userDetails")

      try {
        if(userStore!=null){
          const parsedUser = JSON.parse(userStore);
          console.log("User at getUserFromLocalStorage:", parsedUser.username);
          return parsedUser;
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

  export {
    getUserFromLocalStorage,
    setUserToLocalStorage
  }
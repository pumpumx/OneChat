import React, { useEffect, useState } from 'react'
import { pendingFriendRequestAtom, confirmedFriends } from '../../atoms/friendAtom'
import { useAtom, useSetAtom } from 'jotai'
import { friendReq } from '../../auth_api/friendRequest.auth.api'
import { Check, X, Send, UserRoundPlus, Search , Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { friendChattingWithData } from '../../atoms/friendAtom'
import "react-toastify/dist/ReactToastify.css";

const ToggledRequestTab = () => {
 
  const [friendNameList, setPendingFriendNameList] = useAtom(pendingFriendRequestAtom)
  const [usernameofFriend, setUserNameOfFriend] = useState("")

  const sendFriendRequestHandler = async (friendUsername) => {
    try { 
      const response = await friendReq.sendFriendRequest(friendUsername)
      console.log("response" , response)
      if (response.status === 200){
        toast.success("Request Sent Successfully")
      } 
    } catch (error) {
      toast.error("Request already sent")
        
    }
  }

  const acceptFriendHandler = async (userRes, username) => {
    try {
      const friendRes = await friendReq.friendReqAction(userRes, username)
      console.log("friendRes", friendRes)
      if(friendRes.status === 200){
        toast.success(" Friend request Accepted")

      }
    } catch (error) {
      toast.error("Error occured idk what")
    }
  }

  const rejectFriendHandler = async (userRes, username) => {
    try {
      var friendRes = await friendReq.friendReqAction(userRes, username)
      console.log("rejectFriendRes", friendRes)
      if(friendRes.status === 200){
        toast.success("Friend request Rejected")
      }
    } catch (error) {
      toast.error("Can't reject there request")
    }
  }


  useEffect(() => {
    try {
      (async () => {
        const friendRes = await friendReq.checkPendingFriendRequest()
        setPendingFriendNameList(() => friendRes.map((user) => user.usernames))
        console.log("pendingFriend",)
      })();
    } catch (error) {
      console.log("error", error)
    }
  }, [])


  return (
    <div className='absolute w-[25vh] h-[30vh] rounded-lg ease-in bg-neutral-900 top-10 right-0'>
      <div className='w-full lg:h-[15%] flex p-1 flex-row justify-between'>
        <input type="text" className='w-[80%] h-full rounded-md bg-neutral-600 outline-none border-0 
                            text-white font-bold indent-2
                          ' placeholder='Enter user username'
          onChange={(e) => setUserNameOfFriend(e.target.value)}
        />
        <div className='w-[20%] h-full text-white flex items-center justify-center'>
          <Send onClick={() => sendFriendRequestHandler(usernameofFriend)} />
        </div>
      </div>
      <div className='w-full h-full '>
        <span className='w-full h-full text-lg font-bold text-white text-center tiny5-regular'><p>Friends List</p></span>
        <div className='w-full h-full p-1 '>
          {friendNameList && friendNameList.map((friend, index) => (
            <div key={index} className='w-full h-[10%] flex lg:flex-row items-center justify-around text-white pixelify-sans-okish font-bold bg-neutral-600 text-center'>
              <span className='lg:w-[60%] h-full'><p>{friend}</p></span>
              <div className='lg:w-[10%] h-full flex items-center justify-center hover:scale-110 ease-in font-bold '><Check color='#6ed750' onClick={() => acceptFriendHandler(true, friend)} /></div>
              <div className='lg:w-[10%] h-full flex items-center justify-center hover:scale-110 ease-in font-bold '><X color='red' onClick={() => rejectFriendHandler(false, friend)} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SideChatBar() {

  const setFriendData = useSetAtom(friendChattingWithData)
  const [confirmedFriendsList, setConfirmedAtomList] = useAtom(confirmedFriends)
  const [toggleRequestTab, setToggleRequestTab] = useState(false)

  const requestToggleHandler = () => {
    setToggleRequestTab(!toggleRequestTab)
  }


  const removeFriendHandler = async (username) =>{
    try {
      const response = await friendReq.removeFriend(username)
      if(response.status ===200){
        toast.success(`${username} removed successfully`)
      }
    } catch (error) {
      toast.error("Cannot remove this user , ig he got superpowers.")
    }
  }

  const fetchPersnalUserChatHandler = (friend)=> {
    setFriendData(friend)
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await friendReq.fetchAcceptedFriends()
        const acceptedFriends = response.map((user) => user.username)
        setConfirmedAtomList(acceptedFriends)
      } catch (error) {
        console.log("Error", error)
      }
    })();
  }, [confirmedFriends])

  
  return (
    <div className='lg:w-[30%] h-full bg-red-400'> {/* Private chat with friends feature */}
      <header className='w-full lg:h-[10%] bg-neutral-950 flex lg:flex-row items-center justify-between '>
        <span className='lg:w-[50%] lg:h-full flex flex-row items-center text-3xl pl-3 '><p className='text-white tiny5-regular font-bold '>OneChat</p></span>
        <span className='lg:w-[20%] flex items-center relative justify-center  hover:cursor-pointer transition-all ease-out '>
          <UserRoundPlus color='white' onClick={() => requestToggleHandler()} />
          {toggleRequestTab && (
            <ToggledRequestTab />
          )}
        </span>
      </header>
      <div className='lg:w-full lg:h-[90%] bg-green-700'>
        <div className='lg:w-full lg:h-[5%] bg-neutral-800 flex items-center justify-between'>  {/* Search query element*/}
          <div className='searchFriendInput lg:w-[80%] lg:h-full'>
            <input type="text" className='w-full h-full bg-neutral-700 indent-3 outline-none caret-white font-semibold text-white' />
          </div>
          <div className='searchFriendsLogo lg:w-[20%] lg:h-[85%] flex items-center justify-center'>
            <Search color='white' />
          </div>
        </div>

        <div className='lg:w-full lg:h-[95%] bg-neutral-950'>
          <div className='w-full h-full '>
            {confirmedFriendsList && confirmedFriendsList.map((friend, index) => (
              <div key={index} className='w-full pixelify-sans-okish lg:h-[5rem] border-1 border-white/20  mb-[1px]  text-center lg:text-xl
                        hover:cursor-pointer hover:bg-white/25 transition-all
                      text-white font-normal bg-neutral-800 flex items-center justify-center' onClick={()=> fetchPersnalUserChatHandler(friend)}>
                <span className='lg:w-[80%] lg:h-full justify-center flex lg:flex-row items-center'><p className='text-white'>{friend}</p></span>
                <span className='lg:w-[20%]'><Trash2 color='red' size={22} onClick={()=>removeFriendHandler(friend)}/></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideChatBar
import { chat } from "../auth_api/chat.auth";
import { useSetAtom } from "jotai";
import { chatHistory } from "../atoms/chatAtom";
import { useEffect } from "react";
export function usePrevMessageLoad(){
    const setPrevChatHistory = useSetAtom(chatHistory) //Responsible for fetching room's chat!!

    useEffect(()=>{
        const fetchData = async() => {
            const response = await chat.loadRoomMessage()
            console.log("Prev history res" , response)
            setPrevChatHistory([...response.data.message.message])
        }
        fetchData()
    }, [setPrevChatHistory])

}

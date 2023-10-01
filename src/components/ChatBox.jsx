import { UseFirebaseContext } from "../context/firebaseContext"
import "../styles/ChatBox.css"
export default function ChatBox(){
    const {  open_chat_user_info, SEND_MESSAGE, send_message_value, getValMsg, all_messages_array_db,currentuser } = UseFirebaseContext()
    console.log(open_chat_user_info);
    console.log(all_messages_array_db);

    return(
        <>
         <div className="ChatBox">
            <div className="ChatBoxDiv">
                            <p className="userNameBox">
                                {open_chat_user_info?.[0]?.username}

                            </p>

                            <ul className="messagesUl" >
                                {all_messages_array_db?.map((e, i) => {
                                    console.log(e.senderUID);
                                    console.log(currentuser?.current_user_uid);
                                    return (<li className={e.senderUID!== currentuser?.current_user_uid?"messagesLi":"messagesLiSender"}  key={i}>
                                        {e.messageText}

                                    </li>)

                                })}
                            </ul>
                            <div className="inputBtn">
                            <input className="messageInput" type="text" onChange={(e => getValMsg(e))} value={send_message_value} placeholder="Write your message..." />
                            <button className="messageBtn" onClick={SEND_MESSAGE}>SEND</button>
                            </div>
                            </div>
                        </div>

        </>
    )
}
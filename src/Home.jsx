import { UseFirebaseContext } from "./context/firebaseContext"
import Header from "./components/Header";


export default function Home() {
    const { signin, OpenChat, all_users_array_db, open_chat_user_info, SEND_MESSAGE, currentuser, send_message_value, getValMsg, all_messages_array_db } = UseFirebaseContext()
    const filtered_users = all_users_array_db?.filter((e) => {
        console.log(e.uid);
        console.log(currentuser.current_user_uid);
        return (e.uid !== currentuser.current_user_uid)
    })

    if (signin) {
        console.log(all_users_array_db);
        console.log(open_chat_user_info);
        console.log(all_messages_array_db);

        return (
            <>
                <div>
                    <Header></Header>
                    
                  

                    <div>
                        <p>
                            Chats
                        </p>
                        <ul style={{ color: "red" }}>

                            {filtered_users?.map((e) => {
                                console.log(e.uid, "hi");

                                return (
                                    <li onClick={() => OpenChat(e.uid)} key={e.key}>{e.username}</li>

                                )
                            })}
                        </ul>

                        <div style={{ border: "1px solid red" }}>
                            <p>
                                {open_chat_user_info?.[0]?.username}

                            </p>

                            <ul style={{ display: "flex", flexDirection: "column" }}>
                                {all_messages_array_db?.map((e, i) => {
                                    console.log(e);
                                    return (<li key={i}>
                                        {e.messageText}

                                    </li>)

                                })}
                            </ul>
                            <input type="text" onChange={(e => getValMsg(e))} value={send_message_value} placeholder="Write your message..." />
                            <button onClick={SEND_MESSAGE}>SEND</button>


                        </div>
                    </div>
                </div>
            </>
        )
    }




    else {
        return (
            <>

            </>
        )
    }

}
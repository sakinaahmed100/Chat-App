import { NavLink } from "react-router-dom";
import { UseFirebaseContext } from "./context/firebaseContext"


export default function Home() {
    const { signin, LogOut, OpenChat, all_users_array_db, open_chat_user_info,SEND_MESSAGE,currentuser,getValMsg} = UseFirebaseContext()
    if (signin) {
        console.log(all_users_array_db);
        console.log( open_chat_user_info);

        return (
            <>
                <div>
                    <h1>Chat App</h1>
                    {signin ? <>
                        <NavLink to={"profile"}> <button>profile</button></NavLink>
                        <button onClick={LogOut}>logout</button>
                        <span>{currentuser?.current_username}</span>
                    </>
                        : <>
                            <NavLink to={"signin"}> <button>SignIn</button></NavLink>
                            <p> You can only view chats when logged in</p></>}

                    <div>
                        <p>
                            Chats
                        </p>
                        <ul >

                            {all_users_array_db?.map((e) => {
                                // console.log(e, "hi");

                                return (
                                    <li onClick={() => OpenChat(e.uid)} key={e.key}>{e.username}</li>

                                )
                            })}

                            <div>
                                
                         {   open_chat_user_info?.[0]?.username}
                         <input type="text" onChange={(e=>getValMsg(e))} placeholder="Write your message..."/>
                         <button onClick={SEND_MESSAGE}>SEND</button>


                            </div>
                        </ul>
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
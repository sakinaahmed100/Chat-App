import { UseFirebaseContext } from "./context/firebaseContext"
import Header from "./components/Header";
import UsersPanel from "./components/UsersPanel";
import ChatBox from "./components/ChatBox";


export default function Home() {
    const { signin, open_chat_user_info } = UseFirebaseContext()
    console.log(open_chat_user_info);
    console.log(Object.keys(open_chat_user_info).length);

    if (signin) {

        return (
            <>
                <div>
                    <Header></Header>
                    <div className="useChatsDiv">
                        <UsersPanel></UsersPanel>
                        {Object.keys(open_chat_user_info).length !== 0 ? <ChatBox></ChatBox> : <div>Click on a user to start chat with!<span>Your chat will appear here</span></div>}

                    </div>
                </div>
            </>
        )
    }




    else {
        return (
            <>
  <div>
                    <Header></Header>
                    <div >
                      Please signin to start chatting

                    </div>
                </div>
            </>
        )
    }

}
import { UseFirebaseContext } from "../context/firebaseContext"
import "../styles/UsersPanel.css"

export default function UsersPanel() {
    const {  OpenChat, all_users_array_db,  currentuser,} = UseFirebaseContext()
    const filtered_users = all_users_array_db?.filter((e) => {
        console.log(e.uid);
        console.log(currentuser.current_user_uid);
        return (e.uid !== currentuser.current_user_uid)
    })
    console.log(all_users_array_db);

    return (
        <>
            <div className="usersDiv">
                <p className="userHeading">
                    Users
                </p>
                <ul className="usersPanelul">

                    {filtered_users?.map((e) => {
                        console.log(e.uid, "hi");

                        return (
                            <li onClick={() => OpenChat(e.uid)} key={e.key}>{e.username}</li>

                        )
                    })}
                </ul>
            </div>
        </>
    )
}
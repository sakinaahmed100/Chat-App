import { NavLink } from "react-router-dom";
import { UseFirebaseContext } from "../context/firebaseContext"
import "../styles/Header.css"

export default function Header() {
    const { signin, LogOut, currentuser } = UseFirebaseContext()

    return (
        <>
            <header >
                <div className="header">
                    <div>
                        <h1 className="logo">Chat App</h1>

                    </div>

                    <div className="headerBtnDiv">
                        {signin ? <>
                            <NavLink to={"profile"}> <button className="headerBtn">profile</button></NavLink>
                            <button className="headerBtn" onClick={LogOut}>logout</button>
                        </>
                            : <>
                                <NavLink to={"signin"}> <button className="headerBtn">SignIn</button></NavLink>
                               </>}
                    </div>
                </div>
                <div className="userNamesm">
                Happy chatting {signin?<span>{currentuser?.current_username}</span>:null}!
                </div>

                <div className="userNamelg">
                Start a conversation & make new friends,. Happy chatting {signin?<span>{currentuser?.current_username}</span>:null}!
                </div>
            </header>
        </>
    )
}
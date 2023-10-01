import { NavLink } from "react-router-dom"
import { UseFirebaseContext } from "./context/firebaseContext"
import "./styles/signin.css"

export default function SignIn() {
  const { getValue, email, password, SignIn } = UseFirebaseContext()

  return (
    <>
    <div className="signinContainer">
    <div className="signinDiv">
      <h1 className="chatheading">Chat App</h1>
      <p className="signinheading">Sign In</p>
      <div className="border">
      <form className="signinForm" action="">
        <div className="input_label">
          <label htmlFor="" className="email_label">Enter your email</label>
          <input className="email_input" onChange={(e) => getValue(e)} type="text" name="email" value={email} />

        </div>

        <div className="input_label">
          <label htmlFor="" className="password_label">Enter your password</label>
          <input className="password_input" onChange={(e) => getValue(e)} type="text" name="password" value={password} />


        </div>
      </form>
      <button className="signinBtn" onClick={SignIn}>SignIn</button>
      <span className="signupSpan">Don&apos;t have an account? <NavLink to="/signup">Sign Up</NavLink></span>
      </div>
      </div>
      </div>

    </>
  )
}
import { UseFirebaseContext } from "./context/firebaseContext"
import "./styles/signup.css"
import { NavLink } from "react-router-dom"

export default function SignUp() {
  const { getValue, email, password, username, SignUp } = UseFirebaseContext()

  return (
    <>
      <div className="signupContainer">
        <div className="signupDiv">
        <h1 className="chatheading">Chat App</h1>
      <p className="signupheading">Sign Up</p>

      <div className="border">
      <form className="signupForm" action="">

      <div className="input_label_signup">
          <label htmlFor="" className="email_label_signup">Enter your email</label>
          <input className="email_input_signup" onChange={(e) => getValue(e)} type="text" name="email" value={email} />

        </div>

        <div className="input_label_signup">
          <label htmlFor="" className="password_label_signup">Enter your password</label>
          <input className="password_input_signup" onChange={(e) => getValue(e)} type="text" name="password" value={password} />


        </div>

        <div className="input_label_signup">
          <label htmlFor="" className="username_label_signup">Enter your username</label>
          <input className="username_input_signup" onChange={(e) => getValue(e)} type="text" name="username" value={username} />

        </div>
        </form>
      <button className="signupBtn" onClick={SignUp}>SignUp</button>
      <span className="signinSpan">Already have an account? <NavLink to="/signin">Sign In</NavLink></span>
      </div>
      </div>
    </div >
    </>
  )
}


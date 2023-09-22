import { UseFirebaseContext } from "./context/firebaseContext"

export default function SignIn() {
  const {getValue,email,password,SignIn}=UseFirebaseContext()

    return (
      <>
       <h1>Chat App</h1>
    <p>Sign In</p>
    <input onChange={(e)=>getValue(e)} type="text" name="email" value={email} />
    <input onChange={(e)=>getValue(e)} type="text" name="password" value={password} />
    <button onClick={SignIn}>SignIn</button>
    
       
      </>
    )
  }
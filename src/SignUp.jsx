import { UseFirebaseContext } from "./context/firebaseContext"

export default function SignUp() {
    const {getValue,email,password,username,SignUp}=UseFirebaseContext()

  return (
    <>
    <h1>Chat App</h1>
    <p>Sign Up</p>

    <label htmlFor="">email</label>
    <input onChange={(e)=>getValue(e)} type="text" name="email" value={email} />

    <label htmlFor="">password</label>
    <input onChange={(e)=>getValue(e)} type="text" name="password" value={password} />

    <label htmlFor="">name</label>
    <input onChange={(e)=>getValue(e)} type="text" name="username" value={username} />
    <button onClick={SignUp}>SignUp</button>
    
     
    </>
  )
}


import { createContext, useContext, useEffect, useReducer } from "react";
import firebaseReducer from "../reducer/firebaseReducer";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db, dbRef } from "../firebase.config"
import { useNavigate } from 'react-router-dom';
import { ref, set, child, get } from "firebase/database";

const FirebaseContext = createContext()

const initialState = {
  username: "",
  email: "",
  password: "",
  userinfo: "",
  all_users_array_db: [],
  open_chat_user_info:{},

}

const FirebaseContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(firebaseReducer, initialState)
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {

        dispatch({ type: "SET_USER", payload: user }); // Update state with the user
        console.log("chalooo hai");
        navigate('/');
        getUsersFromDatabase()


      } else {
        // User is signed out
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  function writeUserDatabase(uid, name, email, password) {
    set(ref(db, 'chat_users/' + uid), {
      uid: uid,
      username: name,
      email: email,
      password: password,
    });
  }

  const getUsersFromDatabase = () => {
    get(child(dbRef, 'chat_users')).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        dispatch({ type: "DISPLAY_USERS", payload: snapshot.val() })
        dispatch({ type: "DISPLAY_CURRENT_USER"}); // Update state with the user

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  const getValue = (e) => {
    const { name, value } = e.target
    console.log(name, "value", value);
    console.log(e.target.value);
    dispatch({ type: "GET_VALUE", payload: { name, value } })

  }

  const SignUp = () => {
    createUserWithEmailAndPassword(auth, state.email, state.password)
      .then((userCredential) => {
        console.log(state.email, state.password);

        // Signed in 
        const user = userCredential.user;
        console.log(user.uid);
        writeUserDatabase(user.uid, state.username, state.email, state.password)
        dispatch({ type: "UPDATE_STATE" })
        // navigate('/signin');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);

      });
  }

  const SignIn = () => {
    signInWithEmailAndPassword(auth, state.email, state.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  const LogOut = () => {
    signOut(auth).then(() => {
      dispatch({ type: "LOG_OUT" })

      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }

  const OpenChat = (uid) => {
    dispatch({ type: "OPEN_CHAT_USER", payload: uid })
  }

  const SEND_MESSAGE=()=>{
    console.log("hi");
  }

  const getValMsg=(e)=>{
let {value}=e.target
console.log(value);
  }

  return (<FirebaseContext.Provider value={{ ...state, getValue, SignUp, SignIn, LogOut, OpenChat,SEND_MESSAGE,getValMsg }}>{children}</FirebaseContext.Provider>)
}

const UseFirebaseContext = () => {
  return useContext(FirebaseContext)
}

export { FirebaseContextProvider, UseFirebaseContext }
import { createContext, useContext, useEffect, useReducer } from "react";
import firebaseReducer from "../reducer/firebaseReducer";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db, dbRef } from "../firebase.config"
import { useNavigate } from 'react-router-dom';
import { ref, set, child, get, push } from "firebase/database";

const FirebaseContext = createContext()

const initialState = {
  username: "",
  email: "",
  password: "",
  userinfo: "",
  all_users_array_db: [],
  open_chat_user_info: {},

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

  function createOrRetrieveChat(senderUID, recipientUID) {

    // Create a unique chat ID based on user UIDs or other criteria
    const chatID = generateUniqueChatID(senderUID, recipientUID);

    // Check if the chat already exists
    get(child(dbRef, `chats/${chatID}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // Chat already exists, retrieve chat history
          const chatHistory = snapshot.val();
          console.log('Chat already exists. Retrieved chat history:', chatHistory);
          console.log('messages:', chatHistory.messages);
          getMessagesFromDatabase(chatID)

        } else {
          // Chat doesn't exist, create a new chat entry
          const newChat = {
            participants: [senderUID, recipientUID],
            // createdTimestamp: db.ServerValue.TIMESTAMP // Use Firebase server timestamp
          };
          set(ref(db, `chats/${chatID}`), {
            newChat
          })
            .then(() => {
              // Data saved successfully!
            })
            .catch((error) => {
              console.log(error);

            });
        }
      })
      .catch((error) => {
        console.error('Error checking chat existence:', error);
      });
  }
  function generateUniqueChatID(senderUID, recipientUID) {
    const sortedUIDs = [senderUID, recipientUID]?.sort();

  // Create a chat ID by concatenating sorted UIDs
  const chatID = sortedUIDs.join('_');
    dispatch({ type: "SetUniqueChatID", payload: chatID })
    return chatID;
  }


  const getUsersFromDatabase = () => {
    get(child(dbRef, 'chat_users')).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        dispatch({ type: "DISPLAY_USERS", payload: snapshot.val() })
        dispatch({ type: "DISPLAY_CURRENT_USER" }); // Update state with the user

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  const getMessagesFromDatabase = (chatid) => {
    get(child(dbRef, `chats/${chatid}/messages`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        dispatch({ type: "DISPLAY_MESSAGES", payload: snapshot.val() })

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
    state.all_messages_array_db=[]
    state.open_chat_user_info={}
    let all_users_data_copy = [...state.all_users_array_db]
    const open_chat_user_data = all_users_data_copy?.filter((e) => {
      return (e.uid === uid)
    })

    console.log(state)
    createOrRetrieveChat(state.currentuser.current_user_uid, open_chat_user_data?.[0]?.uid);

    dispatch({ type: "OPEN_CHAT_USER", payload: { open_chat_user_data } })


  }

  function sendMessage(chatID, senderUID, recipientUID, messageText) {


    // Push the new message to the chat's messages node
    console.log(state.chat);
    push(ref(db, `chats/${state.chat.chatuid}/messages`), {
      senderUID: senderUID,
      recipientUID: recipientUID,
      messageText: messageText,
    })
      .then(() => {
        // Data saved successfully!
      })
      .catch((error) => {
        console.log(error);
      });

  }

  const SEND_MESSAGE = () => {
    console.log(state.send_message_value);
    sendMessage(state.chat.chatuid, state.currentuser.current_user_uid, state.open_chat_user_info?.[0]?.uid, state.send_message_value);
    getMessagesFromDatabase(state.chat.chatuid)
    dispatch({type:"EMPTY_INPUT_STATE"})

  }

  const getValMsg = (e) => {
    let value = e.target.value
    dispatch({ type: "GET_MESSAGE_INPUT", payload: value })
  }

  return (<FirebaseContext.Provider value={{ ...state, getValue, SignUp, SignIn, LogOut, OpenChat, SEND_MESSAGE, getValMsg }}>{children}</FirebaseContext.Provider>)
}

const UseFirebaseContext = () => {
  return useContext(FirebaseContext)
}

export { FirebaseContextProvider, UseFirebaseContext }
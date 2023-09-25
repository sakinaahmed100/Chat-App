export default function firebaseReducer(state, action) {
    switch (action.type) {
        case "GET_VALUE": {
            const { name, value } = action.payload
            return {
                ...state,
                [name]: value,
            }

        }

        case "SET_USER": {
            let uid = action.payload.uid
            return {
                ...state,
                signin: true,
                uid: uid,

            }
        }

        case "DISPLAY_CURRENT_USER": {
            const current_user_uid = state.uid;
            const current_user_data = state.all_users_array_db?.filter((e) => {
                return e.uid === current_user_uid
            })
            console.log(current_user_data);

            return {
                ...state,
                currentuser: {
                    current_user_uid: current_user_data?.[0]?.uid,
                    current_username: current_user_data?.[0]?.username,
                    current_user_email: current_user_data?.[0]?.email,
                    current_user_passsword: current_user_data?.[0]?.password,

                }
            }
        }

        case "UPDATE_STATE": {
            return {
                ...state,
                username: "",
                email: "",
                password: "",
            }
        }

        case "DISPLAY_USERS": {
            let all_users_array = []
            const all_users = action.payload
            for (const key in all_users) {
                if (Object.hasOwnProperty.call(all_users, key)) {
                    const all_users_object = all_users[key];
                    // console.log(`${key}: ${all_users_object}`);
                    const userDataObject = {};

                    // Add the 'key' property to userDataObject
                    userDataObject['key'] = key;

                    for (const property in all_users_object) {
                        if (Object.hasOwnProperty.call(all_users_object, property)) {
                            const value = all_users_object[property];
                            // console.log(`  ${property}: ${value}`);

                            userDataObject[property] = value;
                        }
                    }

                    all_users_array.push(userDataObject);

                }

            }
            return {
                ...state,
                all_users_array_db: all_users_array
            }
        }

        case "OPEN_CHAT_USER": {
            let { open_chat_user_data } = action.payload
            return {
                ...state,
                open_chat_user_info: open_chat_user_data,
                chat: {
                    ...state.chat,
                    messages: {

                    }

                }
            }
        }

        case "SetUniqueChatID": {
            let chatID = action.payload
            return {
                ...state,
                chat: {
                    ...state.chat,
                    chatuid: chatID,


                }
            }
        }

        case "DISPLAY_MESSAGES": {
            console.log("hi", action.payload);

            let all_messages_array = []
            const all_messages = action.payload
            for (const key in all_messages) {
                if (Object.hasOwnProperty.call(all_messages, key)) {
                    const all_messages_object = all_messages[key];
                    console.log(`${key}: ${all_messages_object}`);
                    const userMessagesObject = {};

                    // Add the 'key' property to userDataObject
                    userMessagesObject['key'] = key;

                    for (const property in all_messages_object) {
                        if (Object.hasOwnProperty.call(all_messages_object, property)) {
                            const value = all_messages_object[property];
                            console.log(`  ${property}: ${value}`);

                            userMessagesObject[property] = value;
                        }
                    }
                    all_messages_array.push(userMessagesObject);

                }
            }
            console.log(all_messages_array);
            return {
                ...state,
                all_messages_array_db: all_messages_array


            }
        }

        case "GET_MESSAGE_INPUT": {

            return {
                ...state,
                send_message_value: action.payload
            }
        }

        case "EMPTY_INPUT_STATE": {
            console.log("oooops");
            return {
                ...state,
                send_message_value: ""
            }
        }

        case "LOG_OUT": {
            return {
                ...state,
                signin: false,
            }
        }


        default:
            return state
    }
}
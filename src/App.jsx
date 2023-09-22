import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { FirebaseContextProvider } from './context/firebaseContext.jsx'


function App() {

  return (
    <>
      <BrowserRouter>
        <FirebaseContextProvider>

          <Routes>

            <Route exact path="/" Component={Home} />
            <Route exact path="signup" Component={SignUp} />
            <Route exact path="signin" Component={SignIn} />

          </Routes>
        </FirebaseContextProvider>

      </BrowserRouter>
    </>
  )
}

export default App

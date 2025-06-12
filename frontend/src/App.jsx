import { useState } from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import LandingPage from "./pages/landing.jsx"
import Authentication from './pages/authentication.jsx'
import './App.css'
import { AuthProvider } from './contexts/AuthContext.jsx'
import VideoMeetComponent from './pages/VideoMeet.jsx'
import HomeComponent from './pages/home.jsx'
import History from './pages/history.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <AuthProvider>
        <Routes>

          <Route path='/' element={<LandingPage/>}></Route>

          <Route path='/auth' element={<Authentication/>}></Route>

          <Route path='/home' element={<HomeComponent/>}></Route>

          <Route path='/history' element={<History/>}></Route>

          <Route path='/:url' element={<VideoMeetComponent/>}></Route>

        </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App

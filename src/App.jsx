import LoginPage from "./Components/LoginPage"
import SignupPage from "./Components/SignupPage"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./Components/Dashboard"
import ProtectRoute from "./Components/ProtectRoute"

function App() {


  return (
    <Routes>
   
      <Route path="/" element={<SignupPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path='/dashboard' element={<ProtectRoute><Dashboard/></ProtectRoute>}/>
    </Routes>
  )
}

export default App

import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import HomePage from "./pages/HomePage"
import ForgetPasswordForm from "./components/Auth/ForgotPasswordFrom"
import Profile from "./pages/Profile"

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/homepage" element={<HomePage />}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/forget-password" element={<ForgetPasswordForm onSuccess={() => console.log("")}
      />}/>
    </Routes>
  )
}

export default App
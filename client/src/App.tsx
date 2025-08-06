import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import HomePage from "./pages/HomePage"
import ForgetPasswordForm from "./components/Auth/ForgotPasswordFrom"

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/profile" element={<HomePage />}/>
      <Route path="/forget-password" element={<ForgetPasswordForm />}/>
    </Routes>
  )
}

export default App
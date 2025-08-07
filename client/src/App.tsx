import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ForgetPasswordForm from "./components/Auth/ForgotPasswordFrom"
import Profile from "./pages/Profile"
import ProfileUpdateForm from "./components/Profile/EditProfileForm"
import { ToastContainer } from "react-toastify"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        {/* <Route path="/homepage" element={<HomePage />}/> */}
        <Route path="/profile" element={<Profile />}/>
        <Route path="/forget-password" element={<ForgetPasswordForm onSuccess={() => console.log("")}
        />}/>
        <Route path="/update-profile-details" element={<ProfileUpdateForm />}/>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
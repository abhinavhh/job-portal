import { Route, Routes } from "react-router-dom"
import LoginForm from "./components/Auth/LoginForm"

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm/>}/>
    </Routes>
  )
}

export default App
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from './contexts/auth'
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import TasksPage from "./pages/TasksPage";
import ActivationPage from "./pages/ActivationPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/tasks" element={<TasksPage/>}/>
          <Route path="/account/activate/:key" element={<ActivationPage/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

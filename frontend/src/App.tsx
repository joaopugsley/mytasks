import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from './contexts/auth'
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

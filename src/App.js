import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { UserProvider } from "./context/UserContext";
import { Base } from "./pages/Base";


function App() {
  const saludar = () => {
    console.log("hola desde el app.js")
  };
  const saludar2 = () => {
    console.log("hola desde el app.js 2")
  };
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<>NOT FOUND</>} />
            <Route path="/" element={<Base />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home texto="home 1" funcionClic={saludar} />} />
            <Route path="/home2" element={<Home texto="home 2" funcionClic={saludar2} />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>


    </div>
  );
}

export default App;
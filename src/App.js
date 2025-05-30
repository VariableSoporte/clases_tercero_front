import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { UserProvider } from "./context/UserContext";
import { Base } from "./pages/Base";


function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<>NOT FOUND</>} />
            <Route path="/" element={<Base />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
     

    </div>
  );
}

export default App;
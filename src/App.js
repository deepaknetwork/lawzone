import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Zone from "./pages/zone";
import "./style.css";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="*" element={<Login/>}/>
      <Route path="/zone/:pathvariable" element={<Zone/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

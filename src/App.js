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
      <Route path="/lawzone" element={<Login/>}/>
      <Route path="/lawzone/login" element={<Login/>}/>
      <Route path="/lawzone/signup" element={<Signup/>}/>
      <Route path="/lawzone/home" element={<Home/>}/>
      <Route path="/lawzone/*" element={<Login/>}/>
      <Route path="/lawzone/zone/:pathvariable" element={<Zone/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

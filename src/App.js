import "./assest/Style/style.css"
import { Route, Routes } from "react-router-dom";
import { Admin } from "./pages/Admin/Admin";

import { Registor } from "./pages/Registor/Registor";
import {Login} from "./pages/Login/Login";
import {Clinet} from "./pages/Client/Clinet"



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Clinet/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Registor/>} />
        <Route path="/admin/*" element={<Admin/>} />
      </Routes>
    </>
  );
}

export default App;

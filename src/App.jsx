import { useState } from "react";
import "./App.css";
import SignupPage from "./Auth_Pages/SignupPage";
import VeryfyMobileNo from "./Auth_Pages/VeryfyMobileNo";
import VeryfyEmail from "./Auth_Pages/VeryfyEmail";
import Router from "./RouterFile/Router";
import ResetPass from "./Auth_Pages/ResetPass";
import Navbar from "./Components/Navbar";
import Account from "./Main_Pages/Account";
import "../src/Firebase/firebase"
import Home from "./Main_Pages/Home";
function App() {
  return (
    <>
     {/* <SignupPage/> */}
     {/* <VeryfyMobileNo/> */}
     {/* <VeryfyEmail/> */}
     {/* <ResetPass/> */}
     <Router/>
     {/* <Navbar/> */}
     {/* <Home/> */}
     {/* <br /> */}
     {/* <Account/>  */}
    </>
  );
}

export default App;

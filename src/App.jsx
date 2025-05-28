import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import "./App.css";
import SignupPage from "./Auth_Pages/SignupPage";
import VeryfyMobileNo from "./Auth_Pages/VeryfyMobileNo";
import VeryfyEmail from "./Auth_Pages/VeryfyEmail";
import Router from "./RouterFile/Router";
import Navbar from "./Components/Navbar";
import Account from "./Main_Pages/Account";
import "../src/Firebase/firebase"
function App() {
  return (
    <>
     {/* <SignupPage/> */}
     {/* <VeryfyMobileNo/> */}
     {/* <VeryfyEmail/> */}
     <Router/>
     {/* <Navbar/> */}
     
     {/* <br /> */}
     {/* <Account/>  */}
     <ToastContainer />
    </>
  );
}

export default App;

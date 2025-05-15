import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import VeryfyEmail from '../Auth_Pages/VeryfyEmail'
import SignupPage from '../Auth_Pages/SignupPage'
import VeryfyMobileNo from '../Auth_Pages/VeryfyMobileNo'
import LoginPage from '../Auth_Pages/LoginPage'
import ForgetPass from '../Auth_Pages/ForgetPass'
import ResetPass from '../Auth_Pages/ResetPass'
import VeryfyOTP from '../Auth_Pages/VeryfyOTP'
import Home from '../Main_Pages/Home'

export default function Router() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<SignupPage/>} />
      <Route path="/verifyemail" element={<VeryfyEmail />} />
      <Route path="/verifymobile" element={<VeryfyMobileNo/>} />
      <Route path="/Loginpage" element={<LoginPage/>} />
      <Route path="/forget_password" element={<ForgetPass/>} />
      <Route path="/reset_password" element={<ResetPass/>} />
      <Route path="/OTP_verification" element={<VeryfyOTP/>} />
      <Route path="/Home" element={<Home/>} />
    </Routes>
    </BrowserRouter>
  )
}

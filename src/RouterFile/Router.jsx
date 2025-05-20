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
import MainLayout from '../Components/MainLayout'
import Account from '../Main_Pages/Account'

export default function Router() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/register" element={<SignupPage/>} />
      <Route path="/verifyemail" element={<VeryfyEmail />} />
      <Route path="/verifymobile" element={<VeryfyMobileNo/>} />
      <Route path="/Login" element={<LoginPage/>} />
      <Route path="/forget_password" element={<ForgetPass/>} />
      <Route path="/reset_password" element={<ResetPass/>} />
      <Route path="/OTP_verification" element={<VeryfyOTP/>} />
      <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
    </Route>
    </Routes>
    </BrowserRouter>
  )
}

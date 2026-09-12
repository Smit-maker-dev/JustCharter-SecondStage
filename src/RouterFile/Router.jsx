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
import LandingPageV3 from '../v3/LandingPageV3'
import LandingPageV5 from '../v5/LandingPageV5'
import MainLayout from '../Components/MainLayout'
import Account from '../Main_Pages/Account'
import Bookings from '../Main_Pages/Bookings'
import Services from '../Main_Pages/Services'
import EventPage from '../Main_Pages/EventPage'
import AboutPage from '../Main_Pages/AboutPage'
import BuyAndSell from '../Main_Pages/BuyandSell'
import NotFoundPage from '../Main_Pages/NotFoundPage'
import PrivacyAndPolicy from '../Main_Pages/PrivacyAndPolicy'
import ScrollToTop from '../Components/ScrollToTop'
import TermsOfServices from '../Main_Pages/TermsOfServices'
import CanceletionPolicy from '../Main_Pages/CanceletionPolicy'

export default function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
     <Routes>
      <Route path="/register" element={<SignupPage/>} />
      <Route path="/verifyemail" element={<VeryfyEmail />} />
      <Route path="/verifymobile" element={<VeryfyMobileNo/>} />
      <Route path="/Login" element={<LoginPage/>} />
      <Route path="/forget_password" element={<ForgetPass/>} />
      <Route path="/reset_password" element={<ResetPass/>} />
      <Route path="/OTP_verification" element={<VeryfyOTP/>} />
      <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPageV5 />} />
          <Route path="/v5" element={<LandingPageV5 />} />
          <Route path="/account" element={<Account />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/services" element={<Services />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/buy_sell" element={<BuyAndSell/>} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy_policy" element={<PrivacyAndPolicy />} />
          <Route path="/terms_conditions" element={<TermsOfServices />} />
          <Route path="/cancellation-policy" element={<CanceletionPolicy />} />
    </Route>
    <Route path="*" element={<NotFoundPage/>} />
    </Routes>
    </BrowserRouter>
  )
}

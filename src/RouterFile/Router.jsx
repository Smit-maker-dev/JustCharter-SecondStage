import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from '../Components/ScrollToTop'
import MainLayout from '../Components/MainLayout'

// Route-level code splitting with React.lazy
const SignupPage = lazy(() => import('../Auth_Pages/SignupPage'))
const VeryfyEmail = lazy(() => import('../Auth_Pages/VeryfyEmail'))
const VeryfyMobileNo = lazy(() => import('../Auth_Pages/VeryfyMobileNo'))
const LoginPage = lazy(() => import('../Auth_Pages/LoginPage'))
const ForgetPass = lazy(() => import('../Auth_Pages/ForgetPass'))
const ResetPass = lazy(() => import('../Auth_Pages/ResetPass'))
const VeryfyOTP = lazy(() => import('../Auth_Pages/VeryfyOTP'))

const LandingPageV5 = lazy(() => import('../v5/LandingPageV5'))
const FleetPageV5 = lazy(() => import('../v5/FleetPageV5'))
const AboutPageV5 = lazy(() => import('../v5/AboutPageV5'))
const AircraftDetailPageV5 = lazy(() => import('../v5/AircraftDetailPageV5'))
const RequestQuotePageV5 = lazy(() => import('../v5/RequestQuotePageV5'))
const AirAmbulancePage = lazy(() => import('../Main_Pages/AirAmbulancePage'))
const AirAmbulanceRequestPage = lazy(() => import('../v5/AirAmbulanceRequestPage'))
const AirAmbulanceStatusPage = lazy(() => import('../v5/AirAmbulanceStatusPage'))
const ForOperatorsPageV5 = lazy(() => import('../v5/ForOperatorsPageV5'))

const Account = lazy(() => import('../Main_Pages/Account'))
const Bookings = lazy(() => import('../Main_Pages/Bookings'))
const Services = lazy(() => import('../Main_Pages/Services'))
const EventPage = lazy(() => import('../Main_Pages/EventPage'))
const BuyAndSell = lazy(() => import('../Main_Pages/BuyandSell'))
const PrivacyAndPolicy = lazy(() => import('../Main_Pages/PrivacyAndPolicy'))
const TermsOfServices = lazy(() => import('../Main_Pages/TermsOfServices'))
const CanceletionPolicy = lazy(() => import('../Main_Pages/CanceletionPolicy'))
const NotFoundPage = lazy(() => import('../Main_Pages/NotFoundPage'))

import ChunkLoadErrorBoundary from '../Components/ChunkLoadErrorBoundary'

// Light fallback with no layout shifts or visual jarring
function RouteLoadingFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-stone-200 border-t-[#002F5C] rounded-full animate-spin" />
    </div>
  )
}

export default function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ChunkLoadErrorBoundary>
        <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          <Route path="/register" element={<SignupPage />} />
          <Route path="/verifyemail" element={<VeryfyEmail />} />
          <Route path="/verifymobile" element={<VeryfyMobileNo />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/forget_password" element={<ForgetPass />} />
          <Route path="/reset_password" element={<ResetPass />} />
          <Route path="/OTP_verification" element={<VeryfyOTP />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPageV5 />} />
            <Route path="/v5" element={<LandingPageV5 />} />
            <Route path="/fleet" element={<FleetPageV5 />} />
            <Route path="/air-ambulance" element={<AirAmbulancePage />} />
            <Route path="/air-ambulance/request" element={<AirAmbulanceRequestPage />} />
            <Route path="/air-ambulance/status/:token" element={<AirAmbulanceStatusPage />} />
            <Route path="/aircraft/:id" element={<AircraftDetailPageV5 />} />
            <Route path="/request-quote" element={<RequestQuotePageV5 />} />
            <Route path="/request_quote" element={<RequestQuotePageV5 />} />
            <Route path="/for-operators" element={<ForOperatorsPageV5 />} />
            <Route path="/for_operators" element={<ForOperatorsPageV5 />} />
            <Route path="/account" element={<Account />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/services" element={<Services />} />
            <Route path="/event" element={<EventPage />} />
            <Route path="/buy_sell" element={<BuyAndSell />} />
            <Route path="/about" element={<AboutPageV5 />} />
            <Route path="/privacy_policy" element={<PrivacyAndPolicy />} />
            <Route path="/terms_conditions" element={<TermsOfServices />} />
            <Route path="/cancellation-policy" element={<CanceletionPolicy />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ChunkLoadErrorBoundary>
  </BrowserRouter>
  )
}

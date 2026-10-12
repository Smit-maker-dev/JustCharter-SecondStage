import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import FloatingWhatsAppButton from "./FloatingWhatsAppButton";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <FloatingWhatsAppButton />
    </>
  );
}


import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import ScrollManager from "@/components/layout/ScrollManager";
import HomePage from "@/pages/HomePage";

/* Route-level code splitting — only Home ships in the first bundle */
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ServicesPage = lazy(() => import("@/pages/ServicesPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const TestPage = lazy(() => import("@/pages/TestPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Navbar />
      <main id="main" className="page-in">
        <Suspense fallback={<div className="min-h-[70vh]" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/service" element={<Navigate to="/services" replace />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/tests/:slug" element={<TestPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <FloatingWhatsApp />
      <Footer />
    </BrowserRouter>
  );
}

import About from "@/components/About";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Works from "@/components/Works";
import React from "react";

function HomePage() {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Works />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

export default HomePage;

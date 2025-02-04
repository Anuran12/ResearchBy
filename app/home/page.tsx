import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Works from "@/components/Works";
import React from "react";

function HomePage() {
  return (
    <div className="flex flex-col">
      <Header />
      <Hero />
      <About />
      <Works />
      <Contact />
      <Footer />
    </div>
  );
}

export default HomePage;

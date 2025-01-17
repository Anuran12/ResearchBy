import About from "@/components/About";
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
    </div>
  );
}

export default HomePage;

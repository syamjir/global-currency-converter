import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";

function HomePage() {
  console.log(process.env.REACT_APP_API_KEY);
  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
}

export default HomePage;

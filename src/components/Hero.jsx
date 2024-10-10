import React from "react";

function Hero() {
  return (
    <div className="flex flex-col w-full items-center justify-center p-3 mt-16 sm:mt-20  py-1 text-center">
      <div className=" md:w-2/3">
        <h1 className="text-5xl md:text-6xl font-bold">
          Seamlessly Convert Your Money Across World’s Currencies
        </h1>
        <div className="bg-primary-hover-dark mt-14 rounded-3xl text-lg p-6 sm:p-9 sm:mt-10 md:p-7 lg:text-lg text-text">
          <h2 className="text-3xl lg:text-4xl mb-3 text-bold">
            Exchango Currency Converter
          </h2>
          <p className="leading-7 ">
            Our currency converter offers real-time exchange rates, ensuring you
            get the most accurate and up-to-date conversions. Whether you're
            planning your next trip or managing international finances, our tool
            is designed to simplify the process.
          </p>
          <div className="h-0.5 bg-text my-5"></div>
          <blockquote className="rounded-full mt-3 text-md text-text-light ">
            "Money is a terrible master but an excellent servant."
            <footer className="text-end">— P.T. Barnum</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default Hero;


"use client";
import React from "react";
import { WavyBackground } from "./ui/wavy-background";
const CTA = () => {
    return (
      
      <section className="h-[350px] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
       
        <div className="  dark:bg-black bg-white ">
          {/* Heading */}
          
          <h2 className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 py-8"
          >Shorten. Share. Track.</h2>
          <p className="md:text-lg text-base mb-6 text-center">
            Turn long URLs into short, trackable links in seconds. Fast, secure, and free to use!
          </p>
  
          {/* CTA Buttons */}
          
            <button className="bg-white  text-blue-600 font-semibold  mx-10 px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition md:mr-4 mr-2 ">
              🔗 Shorten Your First Link
            </button>
            <button className="bg-gray-100 mx-10 mt-4 text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition">
              📊 Explore Features
            </button>
            
          
         
        </div>
        
      </section>
    
    );
  };
  
  export default CTA;
  
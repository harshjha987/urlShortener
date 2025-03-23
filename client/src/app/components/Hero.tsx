"use client";
import React,{useEffect,useState} from "react";
import { motion } from "framer-motion";
import { Highlight,HeroHighlight } from "./ui/hero-highlight";
import { useRouter } from "next/navigation";
import axios,{AxiosError} from "axios";
const api_url = process.env.NEXT_PUBLIC_BASE_URL;

import { Button } from "./ui/moving-border";
import Link from "next/link";
function Hero() {

  const[loading,setLoading] = useState(false)
  const[isAuthenticated,setAuthenticated] = useState(false)
  const router = useRouter()
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${api_url}/users/auth/check`, {
          withCredentials: true, // ✅ Ensures cookies are sent
        });
  
        if (res.data.authenticated) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.log("Not authenticated", error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
  
    checkAuth();
  }, []);
  
    return(
    <div className=" md:h-[40rem] w-full rounded-md flex flex-col 
    items-center justify-center relative overflow-hidden mx-auto py-0 md:py-0">
    <HeroHighlight>
     
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl mt-10  px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
         Shortrix, The professional URL shortening service.{" "}
         <br />
        <Highlight className="text-black dark:text-white">
        Shorten Your Links, Simplify Your Sharing!
        </Highlight>
      </motion.h1>
      <div className="z-10 text-center mt-6">
        <Link href={isAuthenticated ? "/url" : "/signup"}>
      <Button
    borderRadius="1.75rem"
    className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200
     mx-auto dark:border-slate-800 z-10 text-lg "
  >
    Get Started.
  </Button>
  </Link>
  </div>
 
    </HeroHighlight>
   
   
  </div>
  );
}
export default Hero

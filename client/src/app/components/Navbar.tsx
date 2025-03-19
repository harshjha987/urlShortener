"use client";
import React, { useState,useEffect } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import logo from "../images/logo-url.png"
import Image from "next/image";
import { AlignJustify, X } from 'lucide-react';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; 
const api_url = process.env.NEXT_PUBLIC_BASE_URL;
type User = {
  _id: string;
  username: string;
  email: string;
};

function Navbar({ className }: { className?: string }){
    const [active, setActive] = useState<string | null>(null);
    const [open,setOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter()
    const User = useSelector((state: RootState) => state.user.user);
      // useEffect(()=>{
      //   const fetchUser = async()=>{
      //     try {
      //       const res = await axios.get(`${api_url}/auth/check`, {withCredentials: true})
      //       console.log("Auth respnse" ,res.data)
      //       if(res.data.authenticated){
      //         setUser(res.data.user)
      //       }
      //     } catch (error) {
      //       console.log("User not logged in")
      //       console.error("Error fetching user:");
      //     }finally{
      //       setLoading(false)
      //     }
      //   }
      //   fetchUser();
      // },[])
      
      // if (loading) {
      //   return null; // Wait for loading to finish
      // }
    return (
        <div
          className={cn("fixed top-6 inset-x-0 max-w-5xl mx-auto z-50   justify-between ", className)}
        >
            
            <Menu setActive={setActive}>
            <Link href={'/'}>
                <div className="flex font-bold ml-5 items-center">
               
                    <Image src = {logo} alt="/logo" className="h-6 w-6 mr-2"/>
                   <p className="py-1"> Shortrix</p> 
                  
                </div>
                </Link>
            
            <div className="hidden md:flex items-center space-x-10">
                <HoveredLink href= "/" >
        <MenuItem setActive={setActive} active={active} item="Home">
          
        </MenuItem>
        </HoveredLink>
        
        <MenuItem setActive={setActive} active={active} item="Features">
         
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Contact us">
          
        </MenuItem>
        </div>
        <div className=" hidden md:flex items-center">
        {User ? (
          <button onClick={() => router.push('/profile')} className="px-4 py-2 bg-blue-600 rounded">
            {User.username}'s Profile
          </button>
        ) : (
          <button onClick={() => router.push('/signup')} className="px-4 py-1 bg-green-600 rounded">
            Signup
          </button>
        )}
        
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden z-50 relative">
        {open ? <X /> : <AlignJustify />} {/* Toggle between hamburger and X */}
      </button>
      
        {open && (
        <div className="absolute top-0  right-8 -mt-[2px] bg-black shadow-lg flex flex-col p-4 rounded md:hidden space-y-4">
          <Link href="/">
            <MenuItem setActive={setActive} active={active} item="Home" />
          </Link>
          <MenuItem setActive={setActive} active={active} item="Features" />
          <MenuItem setActive={setActive} active={active} item="Contact us" />
          {/* <Link href="/" className="rounded-lg px-4 py-2 bg-blue-600 text-white">
            <MenuItem setActive={setActive} active={active} item="Sign Up" />
          </Link> */}
          {User ? (
          <button onClick={() => router.push('/profile')} className="px-4 py-2 bg-red-600 rounded">
            {User.username}'s Profile
          </button>
        ) : (
          <button onClick={() => router.push('/signup')} className="px-4 py-2 bg-green-600 rounded">
            Signup
          </button>
        )}
        </div>
      )}

        </Menu>
        </div>
    )

}

export default Navbar;
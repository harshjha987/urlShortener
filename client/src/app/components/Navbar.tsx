"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import logo from "../images/logo-url.png"
import Image from "next/image";
import { AlignJustify } from 'lucide-react';

function Navbar({ className }: { className?: string }){
    const [active, setActive] = useState<string | null>(null);
    const [open,setOpen] = useState(false);
    return (
        <div
          className={cn("fixed top-6 inset-x-0 max-w-5xl mx-auto z-50   justify-between ", className)}
        >
            
            <Menu setActive={setActive}>
            <Link href={'/'}>
                <div className="flex font-bold ml-5 items-center">
               
                    <Image src = {logo} alt="/logo" className="h-6 w-6 mr-2"/>
                   <p> Shortrix</p> 
                  
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
        <Link href={'/'} className="font-semibold  px-4 py-1 text-base bg-blue-600">
        <MenuItem setActive={setActive} active={active} item="Sign Up">
          
        </MenuItem>
        </Link>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden">
          <AlignJustify  />
        </button>
      
        {open && (
        <div className="md:hidden flex flex-col space-y-4 mt-4">
          <Link href="/">
            <MenuItem setActive={setActive} active={active} item="Home" />
          </Link>
          <MenuItem setActive={setActive} active={active} item="Features" />
          <MenuItem setActive={setActive} active={active} item="Contact us" />
          <Link href="/" className="rounded-lg px-4 py-2 bg-blue-600 text-white">
            <MenuItem setActive={setActive} active={active} item="Sign Up" />
          </Link>
        </div>
      )}

        </Menu>
        </div>
    )

}

export default Navbar;
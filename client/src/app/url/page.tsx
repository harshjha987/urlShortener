"use client";

import { motion } from "framer-motion";
import React, { useState,useEffect } from "react";
import { AuroraBackground } from "../components/ui/aurora-background"
import axios from "axios";
import {QRCodeSVG} from 'qrcode.react';
import { useRouter } from "next/navigation";
const api_url = process.env.NEXT_PUBLIC_BASE_URL;
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../redux/userSlice"
import { RootState, AppDispatch } from "@/app/redux/store";

interface UrlData {
  shortUrl: string;
  redirectUrl: string;
  visitedHistory: { timestamp: number }[];
}

interface ApiResponse {
  success: boolean;
  urls: UrlData[];
}

function Page() {
  const [inputUrl, setInputUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [redirectUrl, setRedirectUrl] = useState<{ url: string } | null>(null);
  const [analytics, setAnalytics] = useState<{ totalClicks: number; locations: string[]; referrers: string[] } | null>(null);
  // const [isAuthenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const [urlHistory, setUrlHistory] = useState<ApiResponse | null>(null);
  const [showUrls, setShowUrls] = useState(false);
  
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  useEffect(() => {
    if (user === null) {
      router.push("/login"); // Redirect unauthenticated users to login page
    }
  }, [user, router]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedShortUrl = localStorage.getItem("shortUrl");
      const savedShortId = savedShortUrl?.split("/").pop();

      if (savedShortId) {
        fetchAnalytics(savedShortId);
        getOriginalUrl(savedShortId);
      }
    }
  }, []);

  const handleShorten = async () => {
    try {
      

      const response = await axios.post<{ shortId: string }>(`${api_url}/url`, {
        URL: inputUrl} ,
        {
          withCredentials: true, // ✅ This ensures cookies are sent
        }
      );
console.log(response.data);
      const shortId = response.data?.shortId;
      if (shortId) {
        const shortUrl = `${api_url}/${shortId}`;
        setShortUrl(shortUrl);

        if (typeof window !== "undefined") {
          localStorage.setItem("shortUrl", shortUrl);
        }

       
        await Promise.allSettled([fetchAnalytics(shortId), getOriginalUrl(shortId)]);

      } else {
        setError("Invalid response from server");
      }
    } catch (error) {
      console.error("Error shortening URL:", error);
      setError( "Failed to shorten URL. Please try again.");
    }
  };

  const fetchAnalytics = async (shortId: string) => {
    try {
      const response = await axios.get<{ totalClicks: number; locations: string[]; referrers: string[] }>(
        `${api_url}/url/analytics/${shortId}`
      );
      setAnalytics(response.data);
      localStorage.setItem("analytics", JSON.stringify(response.data));
    } catch (err) {
      console.error("Error fetching analytics:", err);
    }
  };

  const getOriginalUrl = async (shortId: string) => {
    try {
      const response = await axios.get<{ originalUrl: string }>(
        `${api_url}/${shortId}`,
        { headers: { "X-Requested-With": "XMLHttpRequest" } }
      );

      if (response.data.originalUrl) {
        setRedirectUrl({ url: response.data.originalUrl });
        localStorage.setItem("Original Link", JSON.stringify(response.data.originalUrl));
        console.log("Original URL:", response.data.originalUrl);
      }
    } catch (error) {
      console.error("Error fetching original URL:", error);
    }
  };
  const getUrls = async()=>{
    try {
        const res = await axios.get<ApiResponse>(`${api_url}/users/urls`,{withCredentials : true})
        setUrlHistory(res.data);

    } catch (error) {
      console.error("Error fetching url history",error)
    }
  }
 


  return (
   
    <AuroraBackground>
      <div className="overflow-y-auto max-h-full relative mt-24 p-8 w-full  flex flex-col">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 "
      >
        <div className="text-xl md:text-2xl font-bold dark:text-white text-center ">
            
            {/* <p className="text-rose-600 mb-2 text-left">Enter your URL.</p> */}
          <input type="text" value={inputUrl} placeholder="Enter your URL"
          onChange={(e)=> setInputUrl(e.target.value)} className="text-black rounded p-2"/>
        </div>
        
        <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2"
        onClick={handleShorten}>
          Shorten now
        </button>
        <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2"
        onClick={() => {
          try {
            getUrls();
            setShowUrls(true);
          } catch (err) {
            setError("Failed to fetch URLs. Please try again.");
          }
        }}>
           See your shortened Urls
         </button>
         {showUrls && urlHistory && urlHistory.urls && urlHistory.urls.length > 0 && (
   <div className="mt-4 p-4 bg-white shadow-md rounded relative">
     <h2 className="text-xl font-bold mb-2">Your Shortened URLs</h2>
     <button 
                 className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition"
                 onClick={() => setShowUrls(false)}
               >
                 close
               </button>
     <ul className="space-y-3">
       {urlHistory.urls.map((url, index) => (
         <li key={index} className="p-3 bg-gray-100 rounded shadow">
           <p><strong>Short URL:</strong> <a href={url.shortUrl} target="_blank" className="text-blue-500">{url.shortUrl}</a></p>
           <p><strong>Original URL:</strong> <a href={url.redirectUrl} target="_blank" className="text-blue-500">{url.redirectUrl}</a></p>
           <p><strong>Visits:</strong> {url.visitedHistory.length}</p>
           <QRCodeSVG value={shortUrl} className="mt-2" />
         </li>
       ))}
     </ul>
   </div>
 )}
        {error && <p className="text-red-300 mt-2">{error}</p>}
        {shortUrl && (
        <div className="mt-4 p-4 bg-white shadow-md rounded">
          <p>Shortened URL: <a href={shortUrl} className="text-blue-500" target="_blank">{shortUrl}</a></p>
          <QRCodeSVG value={shortUrl} className="mt-2" />
        </div>
      )}
      {analytics && (
  <div className="mt-6 p-4 bg-white shadow-md rounded">
    <h2 className="text-xl font-bold">Analytics</h2>
    <p>Clicks: {analytics.totalClicks}</p>
    <p>Referrers: {analytics.referrers?.join(", ") || "None"}</p>
    <p>Locations: {analytics.locations?.join(", ") || "Unknown"}</p>
  </div>
)}
{redirectUrl && (
  <div className="mt-6 p-4 bg-white shadow-md rounded">
    <h2 className="text-xl font-bold">Original URL</h2>
    <p>
      <a href={redirectUrl.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
        {redirectUrl.url}
      </a>
    </p>
  </div>
)}

      </motion.div>
      </div>
    </AuroraBackground>
   
    
  );
}
export default Page
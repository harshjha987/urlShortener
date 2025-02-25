"use client";

import { motion } from "framer-motion";
import React, { useState,useEffect } from "react";
import { AuroraBackground } from "../components/ui/aurora-background"
import axios from "axios";
import {QRCodeSVG} from 'qrcode.react';
import { useRouter } from "next/navigation";
const api_url = process.env.NEXT_PUBLIC_BASE_URL;
console.log(api_url)

function Page() {
  const [inputUrl, setInputUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [redirectUrl, setRedirectUrl] = useState<{ url: string } | null>(null);
  const [analytics, setAnalytics] = useState<{ totalClicks: number; locations: string[]; referrers: string[] } | null>(null);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  const[loading,setLoading]= useState(true)

  useEffect(() => {
    const checkAuth = async()=>{
    try {
      
        const res = await axios.get(`${api_url}/auth/check`,{withCredentials : true})
        if (res.data.isAuthenticated) {
          setAuthenticated(true);
        } else {
          router.push("/signup");
        }
      
    } catch (error) {
      setAuthenticated(false)
      router.push("/signup")
    }  finally {
      setLoading(false); // Stop loading after check
    }
  }
  checkAuth()
  
  }, [router])

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
    if(!isAuthenticated){
      router.push('/signup')
      console.log("User not authenticated")
      
      return
    }
    try {
      setError("");

      const response = await axios.post<{ shortId: string }>(`${api_url}/url`, {
        URL: inputUrl, 
      },{ withCredentials: true });

      const shortId = response.data?.shortId;
      if (shortId) {
        const shortUrl = `${api_url}/${shortId}`;
        setShortUrl(shortUrl);

        if (typeof window !== "undefined") {
          localStorage.setItem("shortUrl", shortUrl);
        }

        // Fetch analytics and original URL in parallel
        await Promise.all([fetchAnalytics(shortId), getOriginalUrl(shortId)]);
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
        `${api_url}/url/analytics/${shortId}`,{ withCredentials: true }
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
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>; // Show loading spinner
  }
 


  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-xl md:text-2xl font-bold dark:text-white text-center">
            Instant Link Shortner
            <p>Enter your URL.</p>
          <input type="text" value={inputUrl} placeholder="Enter your URL"
          onChange={(e)=> setInputUrl(e.target.value)} className="text-black"/>
        </div>
        
        <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2"
        onClick={handleShorten}>
          Shorten now
        </button>
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
    </AuroraBackground>
  );
}
export default Page
"use client";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/userSlice"
import { RootState, AppDispatch } from "@/app/redux/store";
import axios from "axios";
const api_url = process.env.NEXT_PUBLIC_BASE_URL;
interface UrlData {
  shortUrl: string;
  redirectUrl: string;
  visitedHistory: { timestamp: number }[];
}

interface ApiResponse {
  success: boolean;
  urls: UrlData[];
}

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, userUrls } = useSelector((state: RootState) => state.user);
   const [urlHistory, setUrlHistory] = useState<ApiResponse | null>(null);

  const getUrls = async()=>{
      try {
          const res = await axios.get<ApiResponse>("http://localhost:5000/users/urls",{withCredentials : true})
          setUrlHistory(res.data);
  
      } catch (error) {
        console.error("Error fetching url history",error)
      }
    }
    

  useEffect(() => {
    dispatch(fetchUser());
    // dispatch(fetchUserUrls());
  }, [dispatch]);

  const [error, setError] = useState<string | null>(null);
  const [showUrls, setShowUrls] = useState(false);

  return (
    <div className="overflow-y-auto max-h-full relative mt-24 p-8 w-full flex flex-col items-center text-center">
      {user ? (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Username - {user.username}</h1>

          {/* <h2 className="mt-6 text-xl font-semibold text-gray-700 dark:text-gray-300">Your Shortened URLs</h2> */}
          <div className="mt-4 flex gap-4 justify-center">
            <button
              className="bg-black dark:bg-white rounded-full px-6 py-3 text-white dark:text-black font-medium hover:opacity-80 transition"
              onClick={() => {
                try {
                  getUrls();
                  setShowUrls(true);
                } catch (err) {
                  setError("Failed to fetch URLs. Please try again.");
                }
              }}
            >
              See your shortened URLs
            </button>
            {showUrls && (
              <button 
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
                onClick={() => setShowUrls(false)}
              >
                close
              </button>
            )}
          </div>
          {error && <p className="text-red-500 mt-3">{error}</p>}

          {showUrls && urlHistory?.urls && urlHistory.urls.length > 0 ? (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow relative text-left w-full">
              
              <ul className="space-y-4">
                {urlHistory.urls.map((url, index) => (
                  <li key={index} className="p-4 bg-gray-100  rounded-lg shadow space-y-2 break-words w-full overflow-hidden">
                    <p className="text-gray-800 w-full "><strong>Short URL:</strong> <a href={url.shortUrl} target="_blank" className="text-blue-500 underline">{url.shortUrl}</a></p>
                    <p className="text-gray-800 w-full "><strong>Original URL:</strong> <a href={url.redirectUrl} target="_blank" className="text-blue-500 underline">{url.redirectUrl}</a></p>
                    <p className="text-gray-800 w-full "><strong>Visits:</strong> {url.visitedHistory.length}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : showUrls && (
            <p className="mt-4 text-gray-500 dark:text-gray-400">No shortened URLs found.</p>
          )}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300">Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;

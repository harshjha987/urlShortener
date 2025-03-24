"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/userSlice"
import { RootState, AppDispatch } from "@/app/redux/store";
const api_url = process.env.NEXT_PUBLIC_BASE_URL;

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, userUrls } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
    // dispatch(fetchUserUrls());
  }, [dispatch]);

  return (
    <div className="p-6">
      {user ? (
        <div>
          <h1 className="text-2xl font-bold">{user.username}'s Profile</h1>
          <p>Email: {user.email}</p>

          <h2 className="mt-4 text-xl font-semibold">Your Shortened URLs:</h2>
          {userUrls && userUrls.length > 0 ? (
            <ul className="mt-2">
              {userUrls.map((url, index) => (
                <li key={index} className="border p-3 my-2 rounded-lg">
                  <p>
                    <strong>Short Link:</strong>{" "}
                    <a href={`${api_url}/${url.shortId}`} target="_blank" className="text-blue-500 underline">
                    `${api_url}/{url.shortId}`
                    </a>
                  </p>
                  <p>
                    <strong>Original URL:</strong> {url.originalUrl}
                  </p>
                  <p>
                    <strong>Visits:</strong> {url.visitedHistory.length}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No shortened URLs found.</p>
          )}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;

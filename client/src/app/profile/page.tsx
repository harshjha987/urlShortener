"use client"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/userSlice";
import { AppDispatch, RootState } from "../redux/store"; // Ensure correct imports

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>(); // ✅ Fixes AsyncThunk issue
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    dispatch(fetchUser()); // ✅ Dispatch now works with Thunk
  }, [dispatch]);

  return (
    <div>
      {user ? (
        <div>
          <h1>{user.username}'s Profile</h1>
          <p>Email: {user.email}</p>
          <h2>Your shortened URLs:</h2>
          <ul>
            {user.urls?.map((url, index) => (
              <li key={index}>{url}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;

"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

 function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8001/auth/check", { withCredentials: true });
        setUser(res.data.user);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };
    fetchProfile();
  }, []);

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
}
export default Profile
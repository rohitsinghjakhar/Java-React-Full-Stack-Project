import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MyDashboard.css";

export default function MyDashboard() {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const username = localStorage.getItem("username");
        console.log("Fetched username from localStorage:", username);
        if (!username) {
          alert("No username found in localStorage.");
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/api/users/${username}`
        );

        console.log("User data:", response.data);
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        alert("Error fetching user details");
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>Welcome, {userDetails?.username} 👋</h2>
        <div className="user-info">
          <p>
            <strong>Email:</strong> {userDetails?.email}
          </p>
          <p>
            <strong>Address:</strong> {userDetails?.address}
          </p>
          <p>
            <strong>State:</strong> {userDetails?.state}
          </p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
}

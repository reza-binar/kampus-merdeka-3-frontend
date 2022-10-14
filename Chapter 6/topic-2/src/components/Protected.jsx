import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

function Protected({ children }) {
  // Navigate
  const navigate = useNavigate();

  // Get token from local storage
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Long function
    // async function authorize() {
    //   if (token) {
    //     try {
    //       // Authorize from backend
    //       const response = await axios.get(
    //         "https://topic-auth-2-backend.herokuapp.com/api/v1/auth/me",
    //         {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //         }
    //       );
    //       // If response status not 200, we will redirect to login
    //       if (response.status !== 200) {
    //         // remove token
    //         localStorage.removeItem("token");
    //         // Redirect to login page
    //         navigate("/login");
    //       }
    //     } catch (error) {
    //       if (error.response.status === 401) {
    //         // remove token
    //         localStorage.removeItem("token");
    //         // Redirect to login page
    //         navigate("/login");
    //       }
    //     }
    //   }
    // }
    // authorize();
    //
    // Short function
    (async () => {
      if (token) {
        try {
          // Authorize from backend
          const response = await axios.get(
            "https://topic-auth-2-backend.herokuapp.com/api/v1/auth/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // If response status not 200, we will redirect to login
          if (response.status !== 200) {
            // remove token
            localStorage.removeItem("token");
            // Redirect to login page
            navigate("/login");
          }
        } catch (error) {
          if (error.response.status === 401) {
            // remove token
            localStorage.removeItem("token");
            // Redirect to login page
            navigate("/login");
          }
        }
      }
    })();
  }, [token, navigate]);

  // If no token
  if (!token) {
    return <Navigate to={`/login`} />;
  }

  return children;
}

export default Protected;

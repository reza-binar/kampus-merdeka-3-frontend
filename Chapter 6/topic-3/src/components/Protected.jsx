import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

function Protected({ children, token, setToken }) {
  // Navigate
  const navigate = useNavigate();

  useEffect(() => {
    // Long function
    // async function authorize() {
    //   if (token) {
    //     try {
    //       // Authorize from backend
    //       await axios.get(
    //         "process.env.REACT_APP_AUTH_API/api/v1/auth/me",
    //         {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //         }
    //       );
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
          await axios.get(`${process.env.REACT_APP_AUTH_API}/api/v1/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          if (error.response.status === 401) {
            // remove token
            localStorage.removeItem("token");
            setToken(null);
            // Redirect to login page
            navigate("/login");
          }
        }
      }
    })();
  }, [token, navigate, setToken]);

  // If no token
  if (!token) {
    return <Navigate to={`/login`} />;
  }

  return children;
}

export default Protected;

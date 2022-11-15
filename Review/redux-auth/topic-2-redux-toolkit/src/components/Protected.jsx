import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { me } from "../redux/actions/authActions";

function Protected({ children }) {
  // Navigate
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      if (token) {
        dispatch(
          me((status) => {
            if (status === 401) {
              navigate("/login");
            }
          })
        );
      }
    })();
  }, [token, navigate, dispatch]);

  // If no token
  if (!token) {
    return <Navigate to={`/login`} />;
  }

  return children;
}

export default Protected;

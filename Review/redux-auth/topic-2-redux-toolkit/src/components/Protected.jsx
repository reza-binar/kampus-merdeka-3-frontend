import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { me } from "../redux/actions/authActions";

function Protected({ children, types }) {
  // Navigate
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, user } = useSelector((state) => state.auth);

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

  useEffect(() => {
    if (user) {
      if (!types.some((type) => type === user.type)) {
        navigate("/");
      }
    }
  }, [user, types, navigate]);

  // If no token
  if (!token) {
    return <Navigate to={`/login`} />;
  }

  return children;
}

export default Protected;

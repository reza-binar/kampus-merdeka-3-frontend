import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { loginWithGoogle } from "../redux/actions/authActions";

function GoogleLogin({ label }) {
  const dispatch = useDispatch();

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      // Send access token to backend
      dispatch(loginWithGoogle(access_token));
    },
    onError: (error) => {
      alert(error);
    },
  });

  return (
    <div className="d-grid">
      <div className="m-auto">
        <Button variant="primary" onClick={googleLogin}>
          <FontAwesomeIcon icon={faGoogle} /> {label}
        </Button>
      </div>
    </div>
  );
}

export default GoogleLogin;

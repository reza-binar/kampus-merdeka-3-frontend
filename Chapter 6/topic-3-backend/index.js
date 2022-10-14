const express = require("express");
const cors = require("cors");
const handleGoogleLoginOrRegister = require("./handleGoogleLoginOrRegister");
const PORT = process.env.PORT || "8000";
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/v1/auth/google", handleGoogleLoginOrRegister);
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log("");
  console.log(
    "To get your Google Access Token, go ahead open https://developers.google.com/oauthplayground/"
  );
  console.log("1. Choose Google OAuth2 API V2, pick everything in there!");
  console.log("2. Authorize the API");
  console.log("3. Get the access token");
  console.log("4. Send the access token req.body.accessToken");
});

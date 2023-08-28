const APIError = require("../APIError");
const jwt = require("jsonwebtoken");

const validationService = {
  isConnected(req, res, next) {
    //! if (req.session.user) {
    const requestHeaders = req.headers;
    // par exemple : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE2OTA1MzY2NTJ9.VrLLfbpP9al583wAfRmXMe9LLJnGo5bzvIv7qRLMZ7Q'
    const authorizationHeader = requestHeaders.authorization;

    // le split(" ") découpe ma chaine de caractères suivant un séprateur " " (ici c'est l'espace)
    const authorizationInformation = authorizationHeader.split(" "); // je me retrouve avec un tableau de string

    if (authorizationInformation.length == 2) {
      const token = authorizationInformation[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded", decoded);

      // le token et la session sont ils identiques ?
      if (JSON.stringify(decoded.user)) {
        req.user = decoded.user; // user contient quelque chose, sous-entendu je suis connecté, je peux passer à la suite
        console.log("this is req.user in validation");
        console.log(req.user);
        console.log("this is req session in validation");
        console.log(req.session.user);
        next();
      } else {
        console.log("Token invalide 1");
        //   const error = new APIError("Token invalide", 500);
        //   next(error);
      }
    } else {
      console.log("Token invalide 2");
      // const error = new APIError("Token invalide", 500);
      // next(error);
    }
    //! } else {
    //! console.log("Token invalide 3");
    //!   const error = new APIError("Token invalide", 500);
    //!   next(error);
    //! }
  },
};

module.exports = validationService;

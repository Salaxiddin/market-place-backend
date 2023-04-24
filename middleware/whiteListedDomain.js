const whiteListedDomain = (req, res, next) => {
  const apiKey = req.query.apikey;

  // check if the request includes the api key
  if (apiKey === process.env.API_KEY) {
    next();
    return;
  }

  const allowedDomains = [
    "https://gadgets-specifications-client.vercel.app",
    // "http://localhost:3000",
  ];

  // check if the request origin matches one of the allowed domains
  if (allowedDomains.includes(req.headers.origin)) {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    next();
  } else {
    res
      .status(403)
      .json({ message: "Ohhh! You're not permitted to access the api :(" });
  }
};

module.exports = whiteListedDomain;

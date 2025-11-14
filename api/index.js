import app from "../server/server.js";

// Vercel serverless function handler
const handler = (req, res) => {
  // Remove request listener to prevent timeout
  res.removeHeader("X-Powered-By");
  return app(req, res);
};

export default handler;

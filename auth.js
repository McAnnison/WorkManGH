const jwt = require('jsonwebtoken');

/**
 * Authentication Middleware
 * 
 * This middleware intercepts requests to protected routes. It checks for a 
 * valid JWT in the 'Authorization' header (Bearer scheme). If the token is valid,
 * it decodes it and attaches the payload (which includes the userId) to req.user.
 */
const authMiddleware = (req, res, next) => {
  // Get the Authorization header
  const authHeader = req.headers.authorization;

  // Check if the header exists and follows the 'Bearer <token>' pattern
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No authentication token provided.' });
  }

  // Extract the actual token string
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using the secret defined in your .env file
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded user data (e.g., { userId: "..." }) to the request
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired authentication token.' });
  }
};

module.exports = authMiddleware;
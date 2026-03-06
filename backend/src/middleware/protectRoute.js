import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protectRoute = async (req, res, next) => {
  try {
    // 1. Check for token in BOTH Cookies and Headers (Makes testing in Postman much easier)
    let token = req.cookies.jwt;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // If still no token, reject the request
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    // 2. Verify the token using your secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    // 3. Extract the User ID 
    // This fixes the 404 error by checking the three most common ways the ID might have been saved inside the token payload
    const idToSearch = decoded.userId || decoded.id || decoded._id; 
    
    // 4. Find the user in the database
    const user = await User.findById(idToSearch).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 5. Attach the user to the request and move on
    req.user = user;
    next();
    
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
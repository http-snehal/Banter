import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";


export const signup = async (req, res) => {
  const { email, fullName, password } = req.body;
  try {
    if (!email || !fullName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email: email,
      fullName: fullName,
      password: hashedPassword,
    });

    if (newUser) {
      const token = generateToken(newUser._id, res);

      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        profilePicture: newUser.profilePicture,
        token: token,
      });
    }
  } catch (error) {
    console.error("Signup error", error);
    res.status(500).json({ message: "Server error" });
  }
};




export const login = async (req, res) => {
  const {email , password} = req.body;
  try {
    const user = await User.findOne({ email });

    if(!user){
      return res.status(400).json({ message: "Invalid credentials" });
    }

     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) {
       return res.status(400).json({ message: "Invalid credentials" });
     }

      const token = generateToken(user._id, res);

      res.status(200).json({
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        profilePicture: user.profilePicture,
        token: token,
      });


  } catch (error) {
    console.error("Login error", error);
    res.status(500).json({ message: "Server error" });
  }

}


export const logout = (req, res) => {
  try {
    res.cookie("token", "", {maxAge :0});
    res.status(200).json({ message: "Logged out successfully" }); 


  } catch (error) {
    console.error("Logout error", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {profilePicture} = req.body;
    const userID = req.user._id;

    if(!profilePicture){
      return res.status(400).json({ message: "Profile picture is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePicture)
    const updatedUser = await User.findByIdAndUpdate(userID, {profilePicture: uploadResponse.secure_url}, {new: true});
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update profile error", error);
    res.status(500).json({ message: "Server error" });
  }
}

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

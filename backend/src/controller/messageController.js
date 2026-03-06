import User from "../models/userModel.js";


export const  getUser = async (req, res) => {
    try {
      const loggedInUser = req.user._id;
        const filteredUsers = await User.findById({_id:{ $ne: loggedInUser }}).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error fetching users", error);
        res.status(500).json({ message: "Server error" });
      
    }
}

export const getMessage = async (req, res) => {
  try {
    const {id: userToChatId} = req.params;
    const myId = req.user._id;
    const message = await Message.findOne({ $or: [{ senderID: myId, receiver: userToChatId }, 
      { senderID: userToChatId, receiver: myId }] }).populate("sender receiver", "name email");
    res.status(200).json(message);
  }
  
  
  catch (error) {
    console.error("Error fetching message", error);
    res.status(500).json({ message: "Server error" });
  }
}

export const sendMessage = async (req, res) => {
  try {
    const {id: receiverId} = req.params;
    const{text , image} = req.body;
    const senderId = req.user._id;

    let imgURL = "";
    if(image){
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "chat-app",
        width: 500,
        height: 500,
        crop: "fill",
      });
      imgURL = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imgURL,
    });

    await newMessage.save();

    res.status(200).json(newMessage);

  } catch (error) {
    console.error("Error sending message", error);
    res.status(500).json({ message: "Server error" });
  }
}
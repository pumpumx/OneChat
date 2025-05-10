import mongoose from "mongoose";
import { User } from "../models/user.model.js"; // Adjust the path to your User model

async function dropBadIndex() {
  try {
    const mongoURI = `mongodb+srv://pumpum:jojo@cluster0.tzq9gj6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Cluster0`
    console.log(mongoURI)
    await mongoose.connect(`${mongoURI}`); // Update with your actual MongoDB URI
    await User.collection.dropIndex("userName_1");
    console.log("Dropped the bad index: userName_1");
    await mongoose.disconnect();
  } catch (error) {
    console.error("Failed to drop index:", error.message);
  }
}

dropBadIndex();
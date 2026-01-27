import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";

dotenv.config({});

const getUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB\n");

    // Get all users
    const users = await User.find({}).select("fullname email password profilePhoto createdAt");

    if (users.length === 0) {
      console.log("❌ No users found in the database.");
      return;
    }

    console.log(`📧 Found ${users.length} registered user(s):\n`);
    console.log("=".repeat(80));

    users.forEach((user, index) => {
      console.log(`\n👤 User ${index + 1}:`);
      console.log(`   Full Name: ${user.fullname}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Password (Hashed): ${user.password}`);
      console.log(`   Profile Photo: ${user.profilePhoto}`);
      console.log(`   Registered: ${user.createdAt}`);
      console.log("-".repeat(80));
    });

    console.log("\n⚠️  IMPORTANT: Passwords are hashed using bcrypt and cannot be decrypted.");
    console.log("   If you need to reset a password, you'll need to implement a password reset feature.\n");

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
};

getUsers();

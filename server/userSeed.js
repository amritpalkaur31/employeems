import connectToDatabase from './db/db.js';
import User from './models/User.js';
import bcrypt from 'bcrypt';

const userRegister = async () => {
  await connectToDatabase();

  try {
    const existing = await User.findOne({ email: "admin@gmail.com" });
    if (existing) return console.log("User already exists");

    const hashPassword = await bcrypt.hash("admin", 10);
    const newUser = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashPassword,
      role: "admin"
    });
    await newUser.save();
    console.log("✅ Admin user created!");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
};

userRegister();

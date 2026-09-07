import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

// ==========================================
// MongoDB Atlas URI
// ==========================================
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in .env");
  process.exit(1);
}

// ==========================================
// Admin Schema
// ==========================================
const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// ==========================================
// Admin Model
// ==========================================
const Admin = mongoose.model("Admin", adminSchema);

// ==========================================
// Admins List
// ==========================================
const admins = [
  { email: "bh1@pu.com", password: "bh1@123" },
  { email: "bh2@pu.com", password: "bh2@123" },
  { email: "bh3@pu.com", password: "bh3@123" },
  { email: "bh4@pu.com", password: "bh4@123" },
  { email: "bh5@pu.com", password: "bh5@123" },
  { email: "bh6@pu.com", password: "bh6@123" },
  { email: "bh7@pu.com", password: "bh7@123" },
  { email: "bh8@pu.com", password: "bh8@123" },

  { email: "gh1@pu.com", password: "gh1@123" },
  { email: "gh2@pu.com", password: "gh2@123" },
  { email: "gh3@pu.com", password: "gh3@123" },
  { email: "gh4@pu.com", password: "gh4@123" },
  { email: "gh5@pu.com", password: "gh5@123" },
  { email: "gh6@pu.com", password: "gh6@123" },
  { email: "gh7@pu.com", password: "gh7@123" },
  { email: "gh8@pu.com", password: "gh8@123" },
  { email: "gh9@pu.com", password: "gh9@123" },
  { email: "gh10@pu.com", password: "gh10@123" },
];

// ==========================================
// Insert Admins
// ==========================================
const insertAdmins = async () => {
  try {
    console.log("🔄 Connecting to MongoDB Atlas...");

    await mongoose.connect(MONGO_URI);

    console.log("✅ MongoDB Atlas Connected");
    console.log("");

    let inserted = 0;
    let existing = 0;

    for (const admin of admins) {
      const email = admin.email.toLowerCase().trim();

      // Check if admin already exists
      const exists = await Admin.findOne({ email });

      if (exists) {
        console.log(`⚠️ ${email} already exists`);
        existing++;
        continue;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(
        admin.password,
        10
      );

      // Create admin
      await Admin.create({
        email,
        password: hashedPassword,
      });

      console.log(`✅ ${email} inserted`);
      inserted++;
    }

    console.log("");
    console.log("================================");
    console.log("🎉 Admin seeding completed");
    console.log(`✅ Inserted: ${inserted}`);
    console.log(`⚠️ Already existed: ${existing}`);
    console.log("================================");

  } catch (error) {
    console.error("");
    console.error("❌ Error:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 MongoDB connection closed");
  }
};

// ==========================================
// Start Script
// ==========================================
insertAdmins();
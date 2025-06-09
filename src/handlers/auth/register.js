import User from "../../models/userSchema.js";
import bcrypt from "bcrypt";
import nanoId from "nano-id";

const registerUser = async (request, h) => {
  try {
    const { username, email, password, fullName, role } = request.payload;

    // Cek apakah pengguna sudah ada
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return h.response({ status: "fail", message: "Username or email already exists" }).code(400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate ID dengan nanoId
    const userId = `user-${nanoId()}`;

    // Buat objek pengguna baru
    const newUser = new User({
      _id: userId,
      username,
      email,
      password: hashedPassword,
      fullName,
      role,
    });

    // Simpan ke database
    const result = await newUser.save();

    return h
      .response({
        status: "success",
        message: "User registered successfully",
        data: {
          userId: result._id,
          username: result.username,
          email: result.email,
          fullName: result.fullName,
          role: result.role,
        },
      })
      .code(201);
  } catch (error) {
    console.error("Error registering user:", error);
    return h.response({ status: "fail", message: "Failed to register user" }).code(500);
  }
};

export default registerUser;

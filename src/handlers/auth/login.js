import User from "../../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginUser = async (request, h) => {
  try {
    const { username, email, password } = request.payload;

    if (!username && !email) {
      return h
        .response({ status: "fail", message: "Username or email is required" })
        .code(400);
    }

    const query = username ? { username } : { email };
    const user = await User.findOne(query);

    if (!user) {
      return h
        .response({
          status: "fail",
          message: "Invalid username/email or password",
        })
        .code(401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return h
        .response({
          status: "fail",
          message: "Invalid username/email or password",
        })
        .code(401);
    }

    // Buat token JWT
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    // Kirim token sebagai cookie
    const response = h.response({
      status: "success",
      message: "Login successful",
      data: {
        token,
        userId: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        profileUrl: user.profileUrl,
      },
    });

    response.state("token", token, {
      path: "/",
      isHttpOnly: true,
      isSecure: process.env.NODE_ENV,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      ttl: 3 * 24 * 60 * 60 * 1000, // 3 hari (ms)
    });

    return response.code(200);
  } catch (error) {
    console.error("Error logging in user:", error);
    return h.response({ status: "fail", message: "Failed to login" }).code(500);
  }
};

export default loginUser;

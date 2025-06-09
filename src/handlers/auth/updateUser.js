import User from "../../models/userSchema.js";
import cloudinary from "../../config/cloudinary.js";

const updateUser = async (request, h) => {
  try {
    const { id } = request.params;
    const { username, email, fullName } = request.payload;
    let profileUrl = request.payload.profileUrl;

    const user = await User.findById(id);
    if (!user) {
      return h.response({ status: "fail", message: "User not found" }).code(404);
    }

    // Kalau profileUrl adalah file upload (stream)
    if (profileUrl && profileUrl._data) {
      // upload ke cloudinary
      profileUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: "profiles" }, (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        });
        profileUrl.pipe(stream);
      });
    } else if (!profileUrl) {
      profileUrl = user.profileUrl; // tetap pakai URL lama kalau tidak dikirim
    }

    // update user
    user.username = username || user.username;
    user.email = email || user.email;
    user.fullName = fullName || user.fullName;
    user.profileUrl = profileUrl || user.profileUrl;

    const updatedUser = await user.save();

    return h
      .response({
        status: "success",
        message: "User updated successfully",
        data: updatedUser,
      })
      .code(200);
  } catch (error) {
    console.error("Error updating user:", error);
    return h.response({ status: "fail", message: "Failed to update user" }).code(500);
  }
};

export default updateUser;

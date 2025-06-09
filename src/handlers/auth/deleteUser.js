import User from "../../models/userSchema.js";

const deleteUser = async (request, h) => {
  try {
    const { id } = request.params;

    // Cari pengguna berdasarkan ID
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return h.response({ status: "fail", message: "User not found" }).code(404);
    }

    return h
      .response({
        status: "success",
        message: "User deleted successfully",
        data: {
          userId: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
        },
      })
      .code(200);
  } catch (error) {
    console.error("Error deleting user:", error);
    return h.response({ status: "fail", message: "Failed to delete user" }).code(500);
  }
};

export default deleteUser;

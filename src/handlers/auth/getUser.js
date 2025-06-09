import User from "../../models/userSchema.js";

const getUser = async (request, h) => {
  try {
    const { id } = request.params;

    // Cari user berdasarkan _id (string)
    const user = await User.findById(id);

    if (!user) {
      return h.response({ status: "fail", message: "User not found" }).code(404);
    }

    // Hapus password dari response
    const { password, ...userData } = user._doc;

    return h
      .response({
        status: "success",
        data: userData,
      })
      .code(200);
  } catch (error) {
    console.error("Error fetching user:", error);
    return h.response({ status: "fail", message: "Failed to fetch user" }).code(500);
  }
};

export default getUser;

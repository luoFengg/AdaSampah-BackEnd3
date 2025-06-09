import User from "../../models/userSchema.js";

const refetchUser = async (request, h) => {
  try {
    // Data hasil decode JWT dari middleware
    const { userId } = request.authenticatedUser;
    const user = await User.findById(userId);

    if (!user) {
      return h
        .response({ status: "fail", message: "User not authenticated" })
        .code(401);
    }

    return h
      .response({
        status: "success",
        message: "User is authenticated",
        data: {
          userId: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          fullName: user.fullName,
          profileUrl: user.profileUrl,
        },
      })
      .code(200);
  } catch (error) {
    return h
      .response({ status: "fail", message: "Failed to refetch user" })
      .code(500);
  }
};

export default refetchUser;

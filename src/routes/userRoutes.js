import registerUser from "../handlers/auth/register.js";
import loginUser from "../handlers/auth/login.js";
import logoutUser from "../handlers/auth/logoutUser.js";
import getUser from "../handlers/auth/getUser.js";
import updateUser from "../handlers/auth/updateUser.js";
import deleteUser from "../handlers/auth/deleteUser.js";
import refetchUser from "../handlers/auth/refetchUser.js";
import authenticate from "../middleware/auth.js";

const userRoutes = [
  {
    method: "POST",
    path: "/user/register",
    handler: registerUser,
  },
  {
    method: "POST",
    path: "/user/login",
    handler: loginUser,
  },
  {
    method: "POST",
    path: "/user/logout",
    // options: {
    //   pre: [{ method: authenticate }],
    // },
    handler: logoutUser,
  },
  {
    method: "GET",
    path: "/user/{id}",
    handler: getUser,
  },
  {
    method: "PUT",
    path: "/user/{id}",
    options: {
      pre: [{ method: authenticate }],
      plugins: {
        "hapi-auth-cookie": false,
      },
      payload: {
        output: "stream",
        parse: true,
        multipart: true,
        allow: "multipart/form-data",
      },
    },
    handler: updateUser,
  },
  {
    method: "DELETE",
    path: "/user/{id}",
    options: {
      pre: [{ method: authenticate }],
    },
    handler: deleteUser,
  },
  {
    method: "GET",
    path: "/user/refetch",
    options: {
      pre: [{ method: authenticate }],
      plugins: {
        "hapi-auth-cookie": false,
      },
    },
    handler: refetchUser,
  },
];

export default userRoutes;

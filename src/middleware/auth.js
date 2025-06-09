import jwt from "jsonwebtoken";

// Contoh: blacklist di-memory (untuk production, lebih baik pakai Redis/DB)
export const tokenBlacklist =
  global.tokenBlacklist || (global.tokenBlacklist = new Set());

// Fungsi untuk menambah token ke blacklist
export function addToBlacklist(token) {
  tokenBlacklist.add(token);
}

// Fungsi untuk cek apakah token sudah di-blacklist
export function isTokenBlacklisted(token) {
  return tokenBlacklist.has(token);
}

const authenticate = async (request, h) => {
  try {
    // Ambil token dari cookie
    let token = request.state.token;
    if (Array.isArray(token)) {
      token = token[0]; // Ambil token pertama jika array
    }

    console.log("Token from cookie:", token); // Debug log
    console.log("All cookies:", request.state); // Debug log

    if (!token) {
      return h
        .response({
          status: "fail",
          message: "No token provided",
        })
        .code(401)
        .takeover();
    }

    // Cek apakah token ada di blacklist
    if (tokenBlacklist.has(token)) {
      return h
        .response({
          status: "fail",
          message: "Token has been blacklisted",
        })
        .code(401)
        .takeover();
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.authenticatedUser = decoded;

    return h.continue;
  } catch (error) {
    console.error("Auth middleware error:", error);
    return h
      .response({
        status: "fail",
        message: "Invalid or expired token",
      })
      .code(401)
      .takeover();
  }
};

export default authenticate;

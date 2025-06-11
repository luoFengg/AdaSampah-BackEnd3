import Hapi from "@hapi/hapi";
import routes from "./src/routes/routes.js";
import connectDB from "./src/config/mongoose.js";
import cookie from "@hapi/cookie";
import dotenv from "dotenv";
dotenv.config();

const init = async () => {
  await connectDB();
  console.log("Koneksi ke MongoDB berhasil");
  const server = Hapi.server({
    port: process.env.PORT || 4000,
    host: "0.0.0.0",
    routes: {
      cors: {
        origin: [
          "http://localhost:5173",
          "http://localhost:4173",
          "http://localhost:4173/",
          "http://localhost:5173/",
          "https://adasampah.netlify.app/",
          "https://adasampah.netlify.app",
          "https://adasampah1.netlify.app/",
          "https://adasampah1.netlify.app",
        ],
        credentials: true,
        headers: ["Accept", "Content-Type", "Authorization"],
      },
    },
  });
  await server.register(cookie);
  server.state("token", {
    ttl: null,
    isSecure: process.env.NODE_ENV,
    isHttpOnly: true,
    encoding: "none",
    clearInvalid: false,
    strictHeader: true,
    isSameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // None untuk production, Lax untuk dev
  });

  // Log setiap request masuk
  server.ext("onRequest", (request, h) => {
    console.log("Incoming method:", request.method, "on path:", request.path);
    return h.continue;
  });

  // Handler global untuk OPTIONS agar preflight CORS tidak error dan header CORS dikirim manual
  server.route({
    method: "OPTIONS",
    path: "/{any*}",
    handler: (request, h) => {
      return h
        .response()
        .header("Access-Control-Allow-Origin", request.headers.origin || "*")
        .header(
          "Access-Control-Allow-Methods",
          "GET, POST, PUT, PATCH, DELETE, OPTIONS"
        )
        .header(
          "Access-Control-Allow-Headers",
          "Accept, Content-Type, Authorization"
        )
        .header("Access-Control-Allow-Credentials", "true")
        .code(200);
    },
  });

  server.route(routes);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();

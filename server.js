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
        origin: ["*"],
        credentials: true,
        additionalHeaders: ["content-type", "authorization"],
      },
    },
  });
  await server.register(cookie);
  server.state("token", {
    ttl: null,
    isSecure: true,
    isHttpOnly: true,
    encoding: "none",
    clearInvalid: false,
    strictHeader: true,
  });

  // Log setiap request masuk
  server.ext("onRequest", (request, h) => {
    console.log("Incoming method:", request.method, "on path:", request.path);
    return h.continue;
  });

  // Handler global untuk OPTIONS agar preflight CORS tidak error
  server.route({
    method: "OPTIONS",
    path: "/{any*}",
    handler: (request, h) => {
      return h.response().code(200);
    },
  });

  server.route(routes);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();

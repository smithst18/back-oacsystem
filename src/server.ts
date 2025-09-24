import app from "./app";
import { dbConexion } from "./db/dbConnection";
import dotenv from "dotenv";
import https from "https";
import fs from "fs";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

if (!PORT) {
  console.error("Error: Missing PORT environment variable");
  process.exit(1);
}

const loadSSLOptions = () => {
  const sslDir = path.resolve("./ssl");

  const keyPath = path.join(sslDir, "key.pem");
  const certPath = path.join(sslDir, "cert.pem");
  const caPath = path.join(sslDir, "ca.pem"); // opcional

  if (!fs.existsSync(keyPath)) {
    throw new Error(`❌ SSL key not found: ${keyPath}`);
  }

  if (!fs.existsSync(certPath)) {
    throw new Error(`❌ SSL certificate not found: ${certPath}`);
  }

  // Si quieres obligar a que exista el CA, descomenta:
  // if (!fs.existsSync(caPath)) {
  //     throw new Error(`❌ SSL CA file not found: ${caPath}`);
  // }

  return {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
    // ca: fs.readFileSync(caPath),
  };
};

(async () => {
  let server: any = null;

  try {
    const dbAlive = await dbConexion();
    if (!dbAlive) throw new Error("DB connection failed");

    if (NODE_ENV === "production") {
      console.log(`Running in ${NODE_ENV} mode`);

      let sslOptions;
      try {
        sslOptions = loadSSLOptions();
      } catch (err) {
        console.error(
          "SSL configuration error:",
          err instanceof Error ? err.message : err
        );
        process.exit(1);
      }

      server = https.createServer(sslOptions, app).listen(PORT, () => {
        console.log(`✅ HTTPS Server running on port ${PORT}`);
      });
    } else {
      console.log(`Running in ${NODE_ENV} mode`);
      server = app.listen(PORT, () =>
        console.log(`Server Running on port ${PORT}`)
      );
    }
  } catch (err: unknown) {
    console.error("Server startup failure:", err instanceof Error ? err.message : err);
    if (server) server.close();
    process.exit(1);
  }

  // Manejar cierre limpio del servidor
  process.on("SIGINT", async () => {
    console.log("Shutting down server...");
    if (server) server.close(() => console.log("Server closed."));
    process.exit(0);
  });
})();

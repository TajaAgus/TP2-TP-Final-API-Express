import express from "express";
import RouterEventos from "./router/eventos.js";
import RouterUsuarios from "./router/usuarios.js";
import config from "./config.js";

import CnxMongoDB from "./model/DBMongo.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/api/eventos", new RouterEventos().start());
app.use("/api/usuarios", new RouterUsuarios().start());

if (config.MODO_PERSISTENCIA == "MONGODB") {
  await CnxMongoDB.conectar();
}

const PORT = config.PORT;
const server = app.listen(PORT, () =>
  console.log(`Servidor express escuchando en http://localhost:${PORT}`)
);
server.on("error", (error) =>
  console.log(`Error en servidor: ${error.message}`)
);

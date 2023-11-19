import express from "express";
import RouterEventos from "./router/eventos.js";
import RouterUsuarios from "./router/usuarios.js";
import CnxMongoDB from "./model/DBMongo.js";

class Server {
  constructor(port, persistencia) {
    this.port = port
    this.persistencia = persistencia
    this.app = express()
    this.server = null
  }

  async start() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static("public"));
    this.app.use("/api/eventos", new RouterEventos().start());
    this.app.use("/api/usuarios", new RouterUsuarios().start());
    if(this.persistencia == 'MONGODB') {
      await CnxMongoDB.conectar()
  }

    const PORT = this.port;
    this.server = this.app.listen(PORT, () =>
      console.log(`Servidor express escuchando en http://localhost:${PORT}`)
    );
    this.server.on("error", (error) =>
      console.log(`Error en servidor: ${error.message}`)
    );
  }
  
  async stop() {
    if(this.server) {
        this.server.close()
        await CnxMongoDB.desconectar()
        this.server = null
    }
  }
}

export default Server
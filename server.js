  import express from "express";
  import RouterEventos from "./router/eventos.js";
  import RouterUsuarios from "./router/usuarios.js";
  import CnxMongoDB from "./model/DBMongo.js";
  import cors from 'cors';
  
  class Server {
    constructor(port, persistencia) {
      this.port = port
      this.persistencia = persistencia
      this.app = express()
      this.server = null
    }
    
  async start() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    
    this.app.use("/api/eventos", new RouterEventos().start());
    this.app.use("/api/usuarios", new RouterUsuarios().start());

    if(this.persistencia == 'MONGODB') { await CnxMongoDB.conectar() }

    this.server = this.app.listen(this.port, () =>
      console.log(`Servidor express escuchando en http://localhost:${this.port}`)
    );

    this.server.on("error", (error) =>
      console.log(`Error en servidor: ${error.message}`)
    );

    return this.app
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
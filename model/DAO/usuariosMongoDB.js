import { ObjectId } from "mongodb";
import CnxMongoDB from "../DBMongo.js";

class ModelMongoDB {
  registrarUsuario = async (usuario) => {
    if (!CnxMongoDB.connection) return {};

    await CnxMongoDB.db.collection("usuarios").insertOne(usuario);
    return usuario;
  };

  obtenerUsuarioPorMail = async (mail) => {
    if (!CnxMongoDB.connection) return {};
    const usuario = await CnxMongoDB.db
      .collection("usuarios")
      .findOne({ mail: mail });
    return usuario;
  };

  guardarEventoCreado = async (id, idEvento) => {
    if (!CnxMongoDB.connection) return {};

    await CnxMongoDB.db
      .collection("usuarios")
      .updateOne(
        { _id: id },
        { $push: { eventosCreados: { $each: [idEvento] } } }
      );
  };

  guardarEventoSuscripto = async (id, idEvento) => {
    if (!CnxMongoDB.connection) return {};

    await CnxMongoDB.db
      .collection("usuarios")
      .updateOne(
        { _id: new ObjectId(id) },
        { $push: { eventosSuscriptos: { $each: [new ObjectId(idEvento)] } } }
      );
  };

  eliminarEventoSuscripto = async (id, idEvento) => {
    if (!CnxMongoDB.connection) return {};

    await CnxMongoDB.db
      .collection("usuarios")
      .updateOne(
        { _id: new ObjectId(id) },
        { $pull: { eventosSuscriptos: new ObjectId(idEvento) } }
      );
  };
}

export default ModelMongoDB;

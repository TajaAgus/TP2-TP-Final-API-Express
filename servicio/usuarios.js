import ModelMongoDB from "../model/DAO/usuariosMongoDB.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class Servicio {
  constructor() {
    this.model = new ModelMongoDB();
  }

  registrarUsuario = async (usuario) => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(usuario.password, salt);
    usuario.password = password;
    const usuarioGuardado = await this.model.registrarUsuario(usuario);
    return usuarioGuardado;
  };

  loginUsuario = async (usuario) => {
    const usuarioLogueado = await this.model.obtenerUsuarioPorMail(
      usuario.mail
    );
    if (!usuarioLogueado) return { error: "Usuario no encontrado" };
    const validPassword = await bcrypt.compare(
      usuario.password,
      usuarioLogueado.password
    );
    if (!validPassword) {
      return { error: "Contraseña no válida" };
    }
    const token = jwt.sign(
      {
        mail: usuarioLogueado.mail,
        id: usuarioLogueado._id,
      },
      "secretKey"
    );
    return {token};
  };
}

export default Servicio;

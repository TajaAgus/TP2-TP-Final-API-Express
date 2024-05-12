import ModelMongoDB from "../model/DAO/usuariosMongoDB.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  actualizarUsuario,
  registrarUsuario,
} from "./validaciones/usuarios.js";

class Servicio {
  constructor() {
    this.model = new ModelMongoDB();
  }

  registrarUsuario = async (usuario) => {
    const res = registrarUsuario(usuario);
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(usuario.password, salt);
    usuario.password = password;
    if (res.result) {
      const emailExiste = await this.model.obtenerUsuarioPorMail(usuario.mail);
      if (emailExiste) {
        return { error: "Ya existe un usuario con este mail" };
      }
      const usuarioGuardado = await this.model.registrarUsuario(usuario);
      return { mensaje: "Usuario registrado correctamente" };
    } else {
      console.log(res.error);
      throw res.error;
    }
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
    return { token };
  };

  obtenerUsuario = async (id) => {
    const usuario = await this.model.obtenerUsuarioPorId(id);
    return usuario;
  };

  actualizarUsuario = async (idUsuario, usuario) => {
    const res = actualizarUsuario(usuario);
    if (res.result) {
      const usuarioActualizado = await this.model.actualizarUsuario(
        idUsuario,
        usuario
      );
      return usuarioActualizado;
    } else {
      console.log(res.error);
      throw res.error;
    }
  };
}

export default Servicio;

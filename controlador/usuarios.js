import Servicio from "../servicio/usuarios.js";

class Controlador {
  constructor() {
    this.servicio = new Servicio();
  }

  registrarUsuario = async (req, res) => {
    const usuario = req.body;
    const usuarioGuardado = await this.servicio.registrarUsuario(usuario);
    res.json(usuarioGuardado);
  };

  loginUsuario = async (req, res) => {
    const usuario = req.body;
    const usuarioLogueado = await this.servicio.loginUsuario(usuario);
    res.json(usuarioLogueado);
  };
}

export default Controlador;

import Servicio from "../servicio/usuarios.js";

class Controlador {
  constructor() {
    this.servicio = new Servicio();
  }

  registrarUsuario = async (req, res) => {
    const usuario = req.body;
    try {
      const usuarioGuardado = await this.servicio.registrarUsuario(usuario);
      res.json(usuarioGuardado);
    }
    catch (error) {
      res.status(500).json({ error: error.message })
    }
  };

  loginUsuario = async (req, res) => {
    const usuario = req.body;
    const usuarioLogueado = await this.servicio.loginUsuario(usuario);
    res.json(usuarioLogueado);
  };
}

export default Controlador;

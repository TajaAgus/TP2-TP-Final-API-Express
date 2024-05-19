import Servicio from "../servicio/usuarios.js";

class Controlador {
  constructor() {
    this.servicio = new Servicio();
  }

  registrarUsuario = async (req, res) => {
    const usuario = req.body;
    try {
      const usuarioGuardado = await this.servicio.registrarUsuario(usuario);
      if (usuarioGuardado.error) {
        return res.status(400).json(usuarioGuardado);
      }
      res.json(usuarioGuardado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  loginUsuario = async (req, res) => {
    const usuario = req.body;
    const usuarioLogueado = await this.servicio.loginUsuario(usuario);
    if (usuarioLogueado.error) {
      return res.status(401).json(usuarioLogueado);
    }
    res.json(usuarioLogueado);
  };

  obtenerUsuario = async (req, res) => {
    const token = req.header("Authorization").replace("Bearer ", "");
    const usuario = await this.servicio.obtenerUsuario(req.usuario.id);
    res.json({token, usuario});
  };

  obtenerUsuarioPorId = async (req, res) => {
    const usuario = await this.servicio.obtenerUsuario(req.params.id);
    res.json(usuario);
  };

  actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const idUsuario = req.usuario.id;
    if (id != idUsuario) {
      return res.status(401).json({ error: "Acceso denegado" });
    }
    const usuario = req.body;
    try {
      const usuarioActualizado = await this.servicio.actualizarUsuario(
        idUsuario,
        usuario
      );
      res.json(usuarioActualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default Controlador;

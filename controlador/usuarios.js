import Servicio from "../servicio/usuarios.js";

class Controlador {
  constructor() {
    this.servicio = new Servicio();
  }

  registrarUsuario = async (req, res) => {
    const evento = req.body;
    const eventoGuardado = await this.servicio.guardarEvento(evento);
    res.json(eventoGuardado);
  };

  loginUsuario = async (req, res) => {
    const evento = req.body;
    const eventoGuardado = await this.servicio.guardarEvento(evento);
    res.json(eventoGuardado);
  };
}

export default Controlador;

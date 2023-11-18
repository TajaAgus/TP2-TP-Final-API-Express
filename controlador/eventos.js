import Servicio from "../servicio/eventos.js";

class Controlador {
  constructor() {
    this.servicio = new Servicio();
  }

  obtenerEventos = async (req, res) => {
    const { categoria } = req.query;
    const eventos = await this.servicio.obtenerEventos(categoria);
    res.json(eventos);
  };

  obtenerEvento = async (req, res) => {
    const { id } = req.params;
    const eventos = await this.servicio.obtenerEvento(id);
    res.json(eventos);
  };

  obtenerEventosUsuario = async (req, res) => {
    const id = req.usuario.id;
    const eventos = await this.servicio.obtenerEventosUsuario(id);
    res.json(eventos);
  };

  obtenerClima = async (req, res) => {
    const { id } = req.params;
    const clima = await this.servicio.obtenerClima(id);
    res.json(clima);
  };

  crearEvento = async (req, res) => {

    const evento = req.body;
    evento.idUsuarioCreador = req.usuario.id;
    evento.suscriptores = [req.usuario.id];
    try {
      const eventoGuardado = await this.servicio.crearEvento(evento);
      res.json(eventoGuardado);
    }
    catch (error) {
      res.status(500).json({ error: error.message })
    }
  };

  actualizarEvento = async (req, res) => {
    const { id } = req.params;
    const evento = req.body;
    try {
      const eventoActualizado = await this.servicio.actualizarEvento(id, evento);
      res.json(eventoActualizado);
    }
    catch (error) {
      res.status(500).json({ error: error.message })
    }
  };

  borrarEvento = async (req, res) => {
    const { id } = req.params;
    const eventoBorrado = await this.servicio.borrarEvento(id);
    res.json(eventoBorrado);
  };

  suscribirUsuario = async (req, res) => {
    const { id } = req.params;
    const idUsuario = req.usuario.id;
    const eventos = await this.servicio.suscribirUsuario(id, idUsuario);
    res.json(eventos);
  };

}

export default Controlador;

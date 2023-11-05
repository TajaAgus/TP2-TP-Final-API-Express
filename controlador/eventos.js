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
    const eventos = await this.servicio.obtenerEventos(id);
    res.json(eventos);
  };

  guardarEvento = async (req, res) => {
    const evento = req.body;
    const eventoGuardado = await this.servicio.guardarEvento(evento);
    res.json(eventoGuardado);
  };

  // --------- PUT (actualización parcial) ----------
  actualizarEvento = async (req, res) => {
    const { id } = req.params;
    const evento = req.body;
    const eventoActualizado = await this.servicio.actualizarEvento(id, evento);
    res.json(eventoActualizado);
  };

  borrarEvento = async (req, res) => {
    const { id } = req.params;
    const eventoBorrado = await this.servicio.borrarEvento(id);
    res.json(eventoBorrado);
  };
}

export default Controlador;

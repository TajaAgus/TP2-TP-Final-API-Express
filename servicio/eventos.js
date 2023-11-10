import ModelMongoDB from '../model/DAO/eventosMongoDB'

class Servicio {
  constructor() {
    this.model = ModelMongoDB;
  }

  obtenerEventos = async (categoria) => {
    const eventos = await this.model.obtenerEventos(categoria);
    return eventos;
  };

  obtenerEvento = async (id) => {
    const evento = await this.model.obtenerEventos(id);
    return evento;
  };

  obtenerClima = async (id) => {
    const evento = await this.model.obtenerEventos(id);
    // ACA VA LA INTEGRACION CON LA API DE CLIMA
    return evento;
  };

  guardarEvento = async (evento) => {
    const eventoGuardado = await this.model.guardarEvento(evento);
    return eventoGuardado;
  };

  actualizarEvento = async (id, evento) => {
    const eventoActualizado = await this.model.actualizarEvento(id, evento);
    return eventoActualizado;
  };

  borrarEvento = async (id) => {
    const eventoBorrado = await this.model.borrarEvento(id);
    return eventoBorrado;
  };
}

export default Servicio;

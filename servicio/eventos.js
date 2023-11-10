import ModelMongoDB from '../model/DAO/eventosMongoDB.js'

class Servicio {
  constructor() {
    this.model = ModelMongoDB;
  }
  
  obtenerEvento = async (id) => {
    const evento = await this.model.obtenerEvento(id);
    return evento;
  };
  
  obtenerEventos = async (categoria) => {
    const eventos = await this.model.obtenerEventos(categoria);
    return eventos;
  };


  obtenerEventosUsuario = async (id) => {
    const eventos = await this.model.obtenerEventosUsuario(id);
    return eventos;
  };

  obtenerClima = async (id) => {
    const evento = await this.model.obtenerEvento(id);
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

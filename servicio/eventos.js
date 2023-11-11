import ModelMongoDBEvento from '../model/DAO/eventosMongoDB.js'
import ModelMongoDBUsuario from '../model/DAO/usuariosMongoDB.js'

class Servicio {
  constructor() {
    this.modelEvento = new ModelMongoDBEvento();
    this.modelUsuario = new ModelMongoDBUsuario();
  }
  
  obtenerEvento = async (id) => {
    const evento = await this.modelEvento.obtenerEvento(id);
    return evento;
  };
  
  obtenerEventos = async (categoria) => {
    const eventos = await this.modelEvento.obtenerEventos(categoria);
    return eventos;
  };


  obtenerEventosUsuario = async (id) => {
    const eventos = await this.modelEvento.obtenerEventosUsuario(id);
    return eventos;
  };

  obtenerClima = async (id) => {
    const evento = await this.modelEvento.obtenerEvento(id);
    // ACA VA LA INTEGRACION CON LA API DE CLIMA
    return evento;
  };

  crearEvento = async (evento) => {
    const eventoGuardado = await this.modelEvento.crearEvento(evento);
    await this.modelUsuario.guardarEventoCreado(eventoGuardado.idUsuarioCreador, eventoGuardado._id)
    return eventoGuardado;
  };

  actualizarEvento = async (id, evento) => {
    const eventoActualizado = await this.modelEvento.actualizarEvento(id, evento);
    return eventoActualizado;
  };

  borrarEvento = async (id) => {
    const eventoBorrado = await this.modelEvento.borrarEvento(id);
    return eventoBorrado;
  };

  suscribirUsuario = async (id, idUsuario) => {
    const evento = await this.modelEvento.suscribirUsuario(id, idUsuario);
    await this.modelUsuario.guardarEventoSuscripto(idUsuario, id)
    return evento;
  };
}

export default Servicio;

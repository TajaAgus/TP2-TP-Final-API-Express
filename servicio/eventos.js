import ModelMongoDBEvento from "../model/DAO/eventosMongoDB.js";
import ModelMongoDBUsuario from "../model/DAO/usuariosMongoDB.js";
import axios from "axios";

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
    try {
      const evento = await this.modelEvento.obtenerEvento(id);
      const ciudad = evento.ciudad;
      const dia = evento.dia;
      const hora = evento.hora;
      const apiKey = "ae7a7c2dd5e04ac4983182621231811";

      const urlClimaActual = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${ciudad}&lang=es`;
      const respuestaClimaActual = await axios.get(urlClimaActual);
      const datosClimaActual = respuestaClimaActual.data;

      const { current } = datosClimaActual;
      const temperatura = current.temp_c;
      const descripcion = current.condition.text;

      evento.clima = { temperatura, descripcion };

      if (hora && dia) {
        const urlPronosticoCompleto = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${ciudad}&lang=es&hour=${hora}&dt=${dia}`;
        const respuestaCompleta = await axios.get(urlPronosticoCompleto);
        const datosPronosticoCompleto = respuestaCompleta.data;

        evento.pronosticoHorario = datosPronosticoCompleto.hour;

        evento.pronosticoDiario = datosPronosticoCompleto.forecast.forecastday;
      }

      return evento;
    } catch (error) {
      console.error(`Error al obtener el clima. ${error.message}`);
    }
  };

  crearEvento = async (evento) => {
    const eventoGuardado = await this.modelEvento.crearEvento(evento);
    await this.modelUsuario.guardarEventoCreado(
      eventoGuardado.idUsuarioCreador,
      eventoGuardado._id
    );
    return eventoGuardado;
  };

  actualizarEvento = async (id, evento) => {
    const eventoActualizado = await this.modelEvento.actualizarEvento(
      id,
      evento
    );
    return eventoActualizado;
  };

  borrarEvento = async (id) => {
    const eventoBorrado = await this.modelEvento.borrarEvento(id);
    return eventoBorrado;
  };

  suscribirUsuario = async (id, idUsuario) => {
    const evento = await this.modelEvento.suscribirUsuario(id, idUsuario);
    await this.modelUsuario.guardarEventoSuscripto(idUsuario, id);
    return evento;
  };
}

export default Servicio;

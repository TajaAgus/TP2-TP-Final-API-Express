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
    const evento = await this.modelEvento.obtenerEvento(id);

    const ciudad = evento.ciudad;
    const apiKey = "c61a9fb3b500cc16571aa3562def234b";

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&lang=sp,es&appid=${apiKey}&units=metric`;

    try {
      const respuesta = await axios.get(url);
      const datosClima = respuesta.data;

      const temperatura = datosClima.main.temp;
      const descripcion = datosClima.weather[0].description;

      evento.clima = {
        temperatura,
        descripcion,
      };

      if (evento.hora && evento.dia) {
        const urlPronosticoHorario = `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&lang=sp,es&appid=${apiKey}&units=metric`;
        const respuestaHorario = await axios.get(urlPronosticoHorario);
        const datosPronosticoHorario = respuestaHorario.data;
        evento.pronosticoHorario = datosPronosticoHorario.list;
      }

      if (evento.dia) {
        const urlPronosticoDiario = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${ciudad}&lang=sp,es&appid=${apiKey}&units=metric&cnt=7`;
        const respuestaDiario = await axios.get(urlPronosticoDiario);
        const datosPronosticoDiario = respuestaDiario.data;
        evento.pronosticoDiario = datosPronosticoDiario.list;
      }

      return evento;
    } catch (error) {
      throw new Error(`Error al obtener el clima. ${error.message}`);
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

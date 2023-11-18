import ModelMongoDBEvento from "../model/DAO/eventosMongoDB.js";
import ModelMongoDBUsuario from "../model/DAO/usuariosMongoDB.js";
import axios from "axios";
import {
  validarCrearEvento,
  validarActualizarEvento,
} from "./validaciones/eventos.js";

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

      const urlPronosticoCompleto = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${ciudad}&lang=es&hour=${hora}&dt=${dia}`;
      const respuestaCompleta = await axios.get(urlPronosticoCompleto);
      const datosPronosticoCompleto = respuestaCompleta.data;

      const pronosticoHorario =
        datosPronosticoCompleto.forecast.forecastday[0].hour.find((h) =>
          h.time.includes(hora)
        );
      const pronosticoDiario =
        datosPronosticoCompleto.forecast.forecastday.find(
          (d) => d.date === dia
        );

      evento.pronosticoHorario = {
        time: pronosticoHorario.time,
        temp_c: pronosticoHorario.temp_c,
        condition: pronosticoHorario.condition,
      };

      evento.pronosticoDiario = {
        date: pronosticoDiario.date,
        day: {
          maxtemp_c: pronosticoDiario.day.maxtemp_c,
          mintemp_c: pronosticoDiario.day.mintemp_c,
          condition: pronosticoDiario.day.condition,
        },
      };

      return evento;
    } catch (error) {
      console.error(`Error al obtener el clima. ${error.message}`);
    }
  };

  crearEvento = async (evento) => {
    const res = validarCrearEvento(evento);
    if (res.result) {
      const eventoGuardado = await this.modelEvento.crearEvento(evento);
      await this.modelUsuario.guardarEventoCreado(
        eventoGuardado.idUsuarioCreador,
        eventoGuardado._id
      );
      await this.modelUsuario.guardarEventoSuscripto(eventoGuardado.idUsuarioCreador, eventoGuardado._id);
      return eventoGuardado;
    } else {
      console.log(res.error);
      throw res.error;
    }
  };

  actualizarEvento = async (id, evento) => {
    const res = validarActualizarEvento(evento);
    if (res.result) {
      const eventoActualizado = await this.modelEvento.actualizarEvento(
        id,
        evento
      );
      return eventoActualizado;
    } else {
      console.log(res.error);
      throw res.error;
    }
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

  desuscribirUsuario = async (id, idUsuario) => {
    const evento = await this.modelEvento.desuscribirUsuario(id, idUsuario);
    await this.modelUsuario.eliminarEventoSuscripto(idUsuario, id);
    return evento;
  };
}

export default Servicio;

import axios from "axios";
import config from "../config.js";
import ModelMongoDBEvento from "../model/DAO/eventosMongoDB.js";
import ModelMongoDBUsuario from "../model/DAO/usuariosMongoDB.js";
import { validarCrearEvento, validarActualizarEvento } from "./validaciones/eventos.js";


class Servicio {
  constructor() {
    this.modelEvento = new ModelMongoDBEvento();
    this.modelUsuario = new ModelMongoDBUsuario();
  }

  obtenerEventoUsuario = async (idUsuario, idEvento) => {
    const evento = await this.modelEvento.obtenerEventoUsuario(idEvento, idUsuario);
    return evento;
  };

  obtenerEventosUsuario = async (idUsuario) => {
    const eventos = await this.modelEvento.obtenerEventosUsuario(idUsuario);
    return eventos;
  };

  obtenerEventos = async (categoria) => {
    const eventos = await this.modelEvento.obtenerEventos(categoria);
    return eventos;
  };
  
  obtenerClima = async (idEvento, idUsuario) => {
    const evento = await this.modelEvento.obtenerEventoUsuario(idEvento, idUsuario);

      if (evento) {
        try {
          const ciudad = evento.ciudad;
          const dia = evento.dia;
          const hora = evento.hora;
          const apiKey = config.WEATHER_API_KEY;
    
          const weatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${ciudad}&lang=es&hour=${hora}&dt=${dia}`;
          const res = await axios.get(weatherUrl);
    
          const datos = res.data;
          const datosHora = datos.forecast.forecastday[0].hour.find((h) => h.time.includes(hora));
          const datosDia = datos.forecast.forecastday.find((d) => d.date === dia);
    
          evento.datosHora = {
            time: datosHora.time,
            temp_c: datosHora.temp_c,
            condition: datosHora.condition,
          };
    
          evento.datosDia = {
            date: datosDia.date,
            day: {
              maxtemp_c: datosDia.day.maxtemp_c,
              mintemp_c: datosDia.day.mintemp_c,
              condition: datosDia.day.condition,
            },
          };

          return evento;

        } catch (error) {
          console.error(`Error al obtener el clima. ${error.message}`);
          return { status: "Error al obtener clima" }
        }
      }
      else {
        return {status: "Evento para usuario no encontrado"}
      }
  };

  crearEvento = async (evento, idUsuario) => {
    evento.idUsuarioCreador = idUsuario;
    evento.suscriptores = [idUsuario];

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

  actualizarEvento = async (idEvento, evento, idUsuario) => {
    const res = validarActualizarEvento(evento);
    if (res.result) {
      const eventoActualizado = await this.modelEvento.actualizarEvento(idEvento, evento, idUsuario);
      return eventoActualizado;
    } else {
      console.log(res.error);
      throw res.error;
    }
  };

  borrarEvento = async (idEvento, idUsuario) => {
    const eventoBorrado = await this.modelEvento.borrarEvento(idEvento, idUsuario);
    return eventoBorrado;
  };

  suscribirUsuario = async (idEvento, idUsuario) => {
    const evento = await this.modelEvento.suscribirUsuario(idEvento, idUsuario);
    await this.modelUsuario.guardarEventoSuscripto(idUsuario, idEvento);
    return evento;
  };

  desuscribirUsuario = async (idEvento, idUsuario) => {
    const evento = await this.modelEvento.desuscribirUsuario(idEvento, idUsuario);
    await this.modelUsuario.eliminarEventoSuscripto(idUsuario, idEvento);
    return evento;
  };
}

export default Servicio;

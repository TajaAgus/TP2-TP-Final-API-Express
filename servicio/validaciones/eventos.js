import Joi from "joi";

export const validarCrearEvento = (evento) => {
  const eventoSchema = Joi.object({
    nombre: Joi.string().min(4).max(60).required(),
    categoria: Joi.string().min(4).max(20).required(),
    ciudad: Joi.string().min(4).max(200).required(),
    hora: Joi.number().integer().min(0).max(23).required(),
    dia: Joi.date().iso().greater("now").required(),
    descripcion: Joi.string().min(4).max(200).required(),
    idUsuarioCreador: Joi.string().alphanum().required(),
    suscriptores: Joi.array().required(),
  });

  const { error } = eventoSchema.validate(evento);

  if (error) {
    return { result: false, error };
  }
  return { result: true };
};

export const validarActualizarEvento = (evento) => {
  const eventoSchema = Joi.object({
    nombre: Joi.string().min(4).max(60),
    categoria: Joi.string().min(4).max(20),
    ciudad: Joi.string().min(2).max(200),
    hora: Joi.number().integer().min(0).max(23),
    dia: Joi.date().iso().greater("now"),
    descripcion: Joi.string().min(4).max(200),
    idUsuarioCreador: Joi.string().alphanum(),
    suscriptores: Joi.array(),
  });

  const { error } = eventoSchema.validate(evento);
  
  if (error) {
    return { result: false, error };
  }
  return { result: true };
};

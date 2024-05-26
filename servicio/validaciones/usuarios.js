import Joi from "joi";

export const registrarUsuario = (usuario) => {
  const usuarioSchema = Joi.object({
    mail: Joi.string().email().required(),
    password: Joi.string().min(8).max(48).required(),
    username: Joi.string().min(4).required(),
    edad: Joi.number().integer().min(0).max(99).required(),
    intereses: Joi.array().required(),
    imageUrl: Joi.string().uri().allow('')
  });

  const { error } = usuarioSchema.validate(usuario);
  if (error) {
    return { result: false, error };
  }
  return { result: true };
};

export const actualizarUsuario = (usuario) => {
  const usuarioSchema = Joi.object({
    mail: Joi.string().email(),
    password: Joi.string().min(8).max(48),
    username: Joi.string().min(4),
    imagenUrl: Joi.string().uri(),
    intereses: Joi.array(),
  });

  const { error } = usuarioSchema.validate(usuario);
  if (error) {
    return { result: false, error };
  }
  return { result: true };
};

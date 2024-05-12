import Joi from "joi";

export const registrarUsuario = (usuario) => {
  const usuarioSchema = Joi.object({
    mail: Joi.string().email().required(),
    password: Joi.string().min(8).max(48).required(),
    username: Joi.string().min(4).required(),
    imageUrl: Joi.string().uri().required(),
    intereses: Joi.array().required(),
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
    imageUrl: Joi.string().uri(),
    intereses: Joi.array(),
  });

  const { error } = usuarioSchema.validate(usuario);
  if (error) {
    return { result: false, error };
  }
  return { result: true };
};

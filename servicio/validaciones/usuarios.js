import Joi from 'joi'


export const registrarUsuario = usuario => {

    const usuarioSchema = Joi.object({
        mail: Joi.string().email().required(),
        password: Joi.string().min(3).max(100).required(),
    })

    const { error } = usuarioSchema.validate(usuario)
    if(error) {
        return { result: false, error }
    }
    return { result: true }
}


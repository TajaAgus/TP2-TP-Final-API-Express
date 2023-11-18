import Joi from 'joi'



export const validarCrearEvento = evento => {

    const eventoSchema = Joi.object({
        

        nombre: Joi.string().min(4).max(60).required(),
        categoria: Joi.string().min(4).max(20).required(),
        ciudad: Joi.string().min(4).max(20).required(),
        hora: Joi.string().regex(/^(0?[1-9]|1[0-2])(am|pm)$/i).required(),
        dia: Joi.date().iso().greater('now').max('12-31-2023'),
        descripcion: Joi.string().alphanum().min(4).max(60).required(),
        idUsuarioCreador: Joi.string().alphanum().required(),
        suscriptores: Joi.array().required()

    })

    const { error } = eventoSchema.validate(evento)
    if(error) {
        return { result: false, error }
    }
    return { result: true }
}

export const validarActualizarEvento = evento => {

    const eventoSchema = Joi.object({

        nombre: Joi.string().min(4).max(60),
        categoria: Joi.string().min(4).max(20),
        ciudad: Joi.string().min(4).max(20),
        hora: Joi.string().regex(/^(0?[1-9]|1[0-2])(am|pm)$/i),
        dia: Joi.date().iso().greater('now').max('12-31-2023'),
        descripcion: Joi.string().alphanum().min(4).max(60),
        idUsuarioCreador: Joi.string().alphanum(),
        suscriptores: Joi.array()

    })

    const { error } = eventoSchema.validate(evento)
    if(error) {
        return { result: false, error }
    }
    return { result: true }
}


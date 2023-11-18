import express from 'express'
import Controlador from '../controlador/eventos.js'
import validarToken from '../middleware/validarToken.js'


class Router {
    constructor() {
        this.router = express.Router()
        this.controlador = new Controlador()
    }

    start() {
        this.router.get('/', this.controlador.obtenerEventos)
        this.router.post('/', validarToken, this.controlador.crearEvento)
        this.router.post('/suscribir/:id', validarToken, this.controlador.suscribirUsuario)
        this.router.get('/usuario', validarToken, this.controlador.obtenerEventosUsuario)
        this.router.get('/:id', this.controlador.obtenerEvento)
        this.router.put('/:id', this.controlador.actualizarEvento)
        this.router.get('/clima/:id', this.controlador.obtenerClima)
        this.router.delete('/:id', this.controlador.borrarEvento)
        this.router.delete('/desuscribir/:id', validarToken, this.controlador.desuscribirUsuario)

        return this.router
    }
}   

export default Router


import express from 'express'
import Controlador from '../controlador/eventos.js'
import validarToken from '../middleware/validarToken.js'


class Router {
    constructor() {
        this.router = express.Router()
        this.controlador = new Controlador()
    }

    start() {
        this.router.get('/', validarToken, this.controlador.obtenerEventos)
        this.router.get('/intereses', validarToken, this.controlador.obtenerEventosInteresados)
        this.router.get('/uno/:id', validarToken, this.controlador.obtenerEvento)
        this.router.get('/usuario/uno/:id', validarToken, this.controlador.obtenerEventoUsuario)
        this.router.get('/varios', validarToken, this.controlador.obtenerEventosUsuario)
        this.router.get('/clima/:id', validarToken, this.controlador.obtenerClima)
        this.router.post('/', validarToken, this.controlador.crearEvento)
        this.router.post('/suscribir/:id', validarToken, this.controlador.suscribirUsuario)
        this.router.delete('/desuscribir/:id', validarToken, this.controlador.desuscribirUsuario)
        this.router.delete('/:id', validarToken, this.controlador.borrarEvento)
        this.router.put('/:id', validarToken, this.controlador.actualizarEvento)

        return this.router
    }
}   

export default Router

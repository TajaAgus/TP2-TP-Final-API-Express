import express from 'express'
import Controlador from '../controlador/eventos.js'


class Router {
    constructor() {
        this.router = express.Router()
        this.controlador = new Controlador()
    }

    start() {
        this.router.get('/', this.controlador.obtenerEventos)
        this.router.post('/', this.controlador.guardarEvento)
        this.router.get('/:id', this.controlador.obtenerEvento)
        this.router.get('/usuario/:id', this.controlador.obtenerEventosUsuario)
        this.router.put('/:id', this.controlador.actualizarEvento)
        this.router.get('/clima/:id', this.controlador.obtenerClima)
        this.router.delete('/:id', this.controlador.borrarEvento)

        return this.router
    }
}

export default Router


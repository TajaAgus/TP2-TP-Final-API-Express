import express from 'express'
import Controlador from '../controlador/usuarios.js'


class Router {
    constructor() {
        this.router = express.Router()
        this.controlador = new Controlador()
    }

    start() {
        this.router.post('/registrar', this.controlador.registrarUsuario)
        this.router.post('/login', this.controlador.loginUsuario)
        return this.router
    }
}

export default Router


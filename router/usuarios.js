import express from 'express'
import Controlador from '../controlador/usuarios.js'
import validarToken from '../middleware/validarToken.js'


class Router {
    constructor() {
        this.router = express.Router()
        this.controlador = new Controlador()
    }

    start() {
        this.router.post('/registrar', this.controlador.registrarUsuario)
        this.router.post('/login', this.controlador.loginUsuario)
        this.router.get('/', validarToken, this.controlador.obtenerUsuarioPorId)
        this.router.put('/', validarToken, this.controlador.actualizarUsuario)
        return this.router
    }
}

export default Router

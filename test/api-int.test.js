import { expect } from "chai"
import supertest from "supertest"
import generador from './generador/eventos.js'
import Server from "../server.js"

const request = supertest('http://127.0.0.1:8080')

describe('Test Eventos', () =>{
    describe('POST', () => {
        it('Deberia crear un evento con campo de Id Usuario Creador igual al Id de sesión del Usuario', async () =>{
            const server = new Server(8081, 'MONGODB')
            const app = await server.start()
            const request = supertest(app)
            const evento = generador.get()

            const usuario = {
                mail: "usuario2@gmail.com",
                password: "123"
            }
            const res = await request.post('/api/usuarios/login').send(usuario)
            const token = res.token
            const response = await request.post('/api/eventos').set('Authorization','bearer '+token).send(evento)
            expect(response.status).to.eql(200)

            const eventoGuardado = response.body
            console.log(eventoGuardado)
            expect(eventoGuardado).to.include.keys('ciudad', 'idUsuarioCreador', 'suscriptores', 'nombre', 
            'categoria', 'descripcion', 'hora', 'dia' )

            expect(eventoGuardado.nombre).to.eql(evento.nombre)
            expect(eventoGuardado.ciudad).to.eql(evento.ciudad)
            expect(eventoGuardado.idUsuarioCreador).to.eql(evento.idUsuarioCreador)
            expect(eventoGuardado.suscriptores).to.eql(evento.suscriptores)
            expect(eventoGuardado.categoria).to.eql(evento.categoria)
            expect(eventoGuardado.descripcion).to.eql(evento.descripcion)
            expect(eventoGuardado.hora).to.eql(evento.hora)
            expect(eventoGuardado.dia).to.eql(evento.dia)

        })
    })

    describe('GET', () => {
        it('Deberia retornar un status 200', async () =>{
            const server = new Server(8081, 'MONGODB')
            const app = await server.start()

            const request = supertest(app)
            const response = await request.get('/api/productos')
            
            expect(response.status).to.eql(200)

            await server.stop() 
        })
    })

   
})


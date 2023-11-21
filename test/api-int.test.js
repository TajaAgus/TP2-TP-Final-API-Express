import { expect } from "chai"
import supertest from "supertest"
import generadorEventos from './generador/eventos.js'
import Server from "../server.js"


describe('Tests Eventos', () =>{
    describe('POST', () => {
        it('Campo de Id Usuario Creador = Id de sesión del Usuario Y Evento con todas las Keys', async () =>{
            const app = await new Server(8081, 'MONGODB').start()
            const request = supertest(app)

            const evento = generadorEventos.get()

            const usuario = {
                mail: "usuario-pruebas@gmail.com",
                password: "12345678"
            }
            
            const { body } = await request.post('/api/usuarios/login').send(usuario)
            const token = body.token

            const {body: eventoGuardado, status: statusGuardado} = await request.post('/api/eventos').set('Authorization','bearer '+ token).send(evento)
            expect(statusGuardado).to.eql(200)

            expect(eventoGuardado).to.have.property('ciudad');
            expect(eventoGuardado).to.have.property('idUsuarioCreador');
            expect(eventoGuardado).to.have.property('suscriptores');
            expect(eventoGuardado).to.have.property('nombre');
            expect(eventoGuardado).to.have.property('categoria');
            expect(eventoGuardado).to.have.property('descripcion');
            expect(eventoGuardado).to.have.property('hora');
            expect(eventoGuardado).to.have.property('dia');

            const { body: eventoGet, status: statusGet} = await request.get(`/api/eventos/uno/${eventoGuardado._id}`).set('Authorization', 'bearer ' + token);
            expect(statusGet).to.eql(200);

            expect(eventoGuardado.idUsuarioCreador).to.eql(eventoGet.idUsuarioCreador)
        })
    })

    describe('GET', () => {
        it('Deberia retornar un status 200', async () =>{
            const server = new Server(8082, 'MONGODB')
            const app = await server.start()

            const request = supertest(app)

            const usuario = {
                mail: "usuario-pruebas@gmail.com",
                password: "12345678"
            }
            
            const { body } = await request.post('/api/usuarios/login').send(usuario)
            const token = body.token

            const {status} = await request.get('/api/eventos').set('Authorization','bearer '+ token)
            
            expect(status).to.eql(200)

            await server.stop() 
        })
    })

   
})


import { ObjectId } from "mongodb"
import CnxMongoDB from "../DBMongo.js"

class ModelMongoDB {

    obtenerEvento = async id => {   
        if(!CnxMongoDB.connection) return {}
        const evento = await CnxMongoDB.db.collection('eventos').findOne({_id: new ObjectId(id)})
        return evento
    }

    obtenerEventos = async categoria => {   
        if(!CnxMongoDB.connection) return []

        if(categoria) {
            const evento = await CnxMongoDB.db.collection('eventos').find({categoria: categoria}).toArray()
            return evento
        }
        else {
            const eventos = await CnxMongoDB.db.collection('eventos').find({}).toArray()
            return eventos
        }
    }

    obtenerEventosUsuario = async id => {   
        if(!CnxMongoDB.connection) return {}
        const eventos = await CnxMongoDB.db.collection('eventos').find({ suscriptores: { $in: [new ObjectId(id)] } }).toArray()
        return eventos || []
    }

    guardarEvento = async evento => {
        if(!CnxMongoDB.connection) return {}

        await CnxMongoDB.db.collection('eventos').insertOne(evento)
        return evento
    }

    actualizarEvento = async (id, evento) => {
        if(!CnxMongoDB.connection) return {}

        await CnxMongoDB.db.collection('eventos').updateOne(
            { _id: new ObjectId(id) },
            { $set: evento }
        )

        const eventosActualizado = await this.obtenerEventos()
        return eventosActualizado
    }

    borrarEvento = async id => {
        if(!CnxMongoDB.connection) return {}

        const eventosBorrado = await this.obtenerEventos()
        await CnxMongoDB.db.collection('eventos').deleteOne( { _id: new ObjectId(id) })
        return eventosBorrado
    }
}

export default ModelMongoDB
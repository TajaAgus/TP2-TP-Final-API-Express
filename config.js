import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT
const MODO_PERSISTENCIA = process.env.MODO_PERSISTENCIA
const DATABASE_URL = process.env.DATABASE_URL
const BASE = process.env.BASE
const WEATHER_API_KEY = process.env.WEATHER_API_KEY

export default {
    PORT,
    MODO_PERSISTENCIA,
    DATABASE_URL,
    BASE,
    WEATHER_API_KEY
}
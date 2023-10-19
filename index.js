const express = require('express')
require('dotenv').config()
const cors= require('cors')

const { dbConnection } = require('./database/config')

const port= process.env.PORT

const app = express()

//Conexion a Base de datos
dbConnection()

//Cors
app.use(cors())

// Directorio publico
app.use(express.static('public'))

//parseo de body
app.use(express.json())

// Rutas
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/events', require('./routes/events.routes'))


app.listen( port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
})
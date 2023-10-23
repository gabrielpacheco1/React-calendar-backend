const express = require('express')
require('dotenv').config()
const cors= require('cors')

const { dbConnection } = require('./database/config')

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

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})


app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})
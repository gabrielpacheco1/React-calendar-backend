const express = require('express')
require('dotenv').config()

const port= process.env.PORT

const app = express()

// Directorio publico
app.use(express.static('public'))

//parseo de body
app.use(express.json())

// Rutas
app.use('/api/auth', require('./routes/auth.routes'))


app.listen( port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
})
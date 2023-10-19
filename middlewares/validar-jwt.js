const {request, response} = require('express')

const validarJwt = (req, res= response, next) => {
  
    const token = req.header('x-token')
    console.log(token)
    next()

}

module.exports = {
    validarJwt
}

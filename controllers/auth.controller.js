const express= require('express')
const {validationResult} = require('express-validator')

const postUser= (req, res) => {

    const {name, email, password} = req.body

    //manejo de errores
    const errors = validationResult(req)
    // if()
    console.log(errors)

    res.json({
        ok: true,
        msg: 'POST REGISTER',
        name,
        email, 
        password
    })
}

const LoginUser = (req, res= express.response) => {

    const {email, password} = req.body

    res.json({
        ok: true,
        msg: 'POST LOGIN',
        email,
        password
    })
}

const renewToken = (req, res) => {
    res.json({
        ok: true,
        msg: 'GET RENEW'
    })
}

module.exports= {
    LoginUser,    
    postUser,
    renewToken
}
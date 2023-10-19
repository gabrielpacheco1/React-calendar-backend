const { model } = require('mongoose')
const bcryptjs = require('bcryptjs')

const express= require('express')
const Usuario = require('../models/Usuario')
const { generarJWT } = require('../helpers/jwt')

const postUser= async(req, res) => {

    const {name, email, password} = req.body

    try {
        
        let usuario = await Usuario.findOne({email})
        
        if (usuario){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado',
            })
        }
        
        usuario= new Usuario(req.body)
        
        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync()
        usuario.password= bcryptjs.hashSync(password, salt)
        
        await usuario.save()

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name)
            
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Comunicarse con el administrador',
        })
    }
}

const LoginUser = async(req, res= express.response) => {
    
    const {email, password} = req.body
    
    try {
        
        let usuario = await Usuario.findOne({email})

        if (!usuario){
            return res.status(400).json({
                ok: false,
                msg: `El correo ${email} no está registrado`,
            })
        }

        // verficar la contraseña
        if(!bcryptjs.compareSync(password, usuario.password)){
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña es incorrecta'
            })
        }
        
        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name)

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Comunicarse con el administrador',
        })
    }
    
}

const renewToken = async(req, res) => {

    const uid= req.uid
    const name= req.name

    // Generar JWT
    const token = await generarJWT(uid, name)

    res.json({
        ok: true,
        token
    })
}

module.exports= {
    LoginUser,    
    postUser,
    renewToken
}
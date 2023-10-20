const { response, request } = require('express')
const { model } = require('mongoose')

const express= require('express')
const Evento = require('../models/Evento')

const getEvents = async(req, res= response) => {

    res.json({
        ok: true,
        msg: 'Obtener eventos'
    })
}

const postEvent = async(req, res= response) => {

    //Verificar que llegue el evento
    const evento = new Evento(req.body)
    
    try {

        evento.user= req.uid

        const eventoDB = await evento.save()

        res.json({
            ok: true,
            evento: eventoDB
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Comunicarse con el administrador'
        })
    }
}

const putEvent = async(req= request, res= response) => {

    const {id} = req.params

    res.json({
        ok: true,
        msg: 'Actualizar evento',
        id
    })
}

const deleteEvent = async(req= request, res= response) => {

    const {id} = req.params

    res.json({
        ok: true,
        msg: 'Eliminar evento',
        id
    })
}

module.exports= {
    deleteEvent,
    getEvents,
    postEvent,
    putEvent
}
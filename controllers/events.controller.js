const { model } = require('mongoose')

const express= require('express')

const getEvents = async(req, res) => {

    res.json({
        ok: true,
        msg: 'Obtener eventos'
    })
}

module.exports= {
    getEvents
}
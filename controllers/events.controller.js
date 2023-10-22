const { response, request } = require('express')
const Evento = require('../models/Evento')

const getEvents = async(req, res= response) => {

    const eventos= await Evento.find()
                                .populate('user', 'name')

    res.json({
        ok: true,
        eventos
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
    const uid = req.uid

    try {
        const evento= await Evento.findById(id)
    
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe evento',
                id
            })
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No está autorizado',
                id
            })
        }
        
        const nuevoEvento= {
            ...req.body,
            user: uid
        }

        const eventoAct= await Evento.findByIdAndUpdate(id, nuevoEvento, {new: true})

        res.json({
            ok: true,
            eventoAct
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Comunicarse con el administrador',
        })
    }

}

const deleteEvent = async(req= request, res= response) => {

    const {id} = req.params
    const uid = req.uid

    try {
        const evento= await Evento.findById(id)
    
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe evento',
                id
            })
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No está autorizado',
                id
            })
        }
        
        const eventoDel= await Evento.findByIdAndDelete(id)

        res.json({
            ok: true,
            eventoDel
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Comunicarse con el administrador',
        })
    }
}

module.exports= {
    deleteEvent,
    getEvents,
    postEvent,
    putEvent
}
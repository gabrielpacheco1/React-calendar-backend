const express= require('express')
const router= express.Router()
const {check}= require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJwt } = require('../middlewares/validar-jwt')
const { getEvents } = require('../controllers/events.controller')

/*
    Rutas de events
    host + /api/events
*/


// router.post('/new', [
//     check('name', 'El nombre es obligatorio').not().isEmpty(),
//     check('email', 'El email es obligatorio').isEmail(),
//     check('password', 'El password debe tener un minimo de 6 caracteres').isLength({min: 6}),
//     validarCampos
// ], postUser)

// router.post('/', [
//     check('email', 'El email es obligatorio').isEmail(),
//     check('password', 'El password debe tener un minimo de 6 caracteres').isLength({min: 6}),
//     validarCampos
// ], LoginUser)

router.get('/', validarJwt, getEvents)

module.exports = router
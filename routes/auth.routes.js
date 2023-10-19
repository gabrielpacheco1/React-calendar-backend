const express= require('express')
const router= express.Router()
const {check}= require('express-validator')

const { postUser, LoginUser, renewToken } = require('../controllers/auth.controller')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJwt } = require('../middlewares/validar-jwt')

/*
    Rutas de auth
    host + /api/auth
*/


router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe tener un minimo de 6 caracteres').isLength({min: 6}),
    validarCampos
], postUser)

router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe tener un minimo de 6 caracteres').isLength({min: 6}),
    validarCampos
], LoginUser)

router.get('/renew', validarJwt, renewToken)

module.exports = router
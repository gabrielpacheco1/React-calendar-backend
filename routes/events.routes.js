const express= require('express')
const router= express.Router()
const {check}= require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJwt } = require('../middlewares/validar-jwt')
const { getEvents, postEvent, putEvent, deleteEvent } = require('../controllers/events.controller')
const { isDate } = require('../helpers/isDate')

/*
    Rutas de events
    host + /api/events
*/

//Todas las peticiones que estén debajo deben pasar esa validación
router.use(validarJwt)

router.get('/', validarJwt, getEvents)

router.post('/', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de fin es obligatoria').custom(isDate),
    validarCampos
], postEvent)

router.put('/:id', [validarJwt], putEvent)

router.delete('/:id', [validarJwt], deleteEvent)

module.exports = router
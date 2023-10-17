const express= require('express')
const router= express.Router()
const {check}= require('express-validator')

const { postUser, LoginUser, renewToken } = require('../controllers/auth.controller')
/*
    Rutas de auth
    host + /api/auth
*/


router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty()
], postUser)

router.post('/', LoginUser)

router.get('/renew', renewToken)

module.exports = router
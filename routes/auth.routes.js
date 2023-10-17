const express= require('express')
const router= express.Router()

const { postUser, LoginUser, renewToken } = require('../controllers/auth.controller')
/*
    Rutas de auth
    host + /api/auth
*/


router.post('/new', postUser)

router.post('/', LoginUser)

router.get('/renew', renewToken)

module.exports = router
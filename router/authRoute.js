const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
require('dotenv').config()


router.post('/jwt', async (req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
    res
        .cookie('token', token, {
            httpOnly: true,
            secure: false

        })
        .send({ success: true })
})


module.exports = router;
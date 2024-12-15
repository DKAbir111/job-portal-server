const express = require('express')
require('dotenv').config()

const app = express()
app.get('/', (req, res) => {
    res.send("Hello! from job-portal-server")
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
    console.log(`Press Ctrl+C to stop server`)
})
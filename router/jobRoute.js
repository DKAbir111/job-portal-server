const express = require('express')
const router = express.Router()

const createJob = (jobCollection) => {

    router.post('/jobs', async (req, res) => {
        const newJob = req.body
        const result = await jobCollection.insertOne(newJob)
        res.send(result)
    })

    router.get('/jobs', async (req, res) => {
        const allJobs = await jobCollection.find().toArray()
        res.send(allJobs)
    })

    return router;
}

module.exports = createJob;
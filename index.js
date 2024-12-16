const express = require('express')
require('dotenv').config()
const app = express()
const createJobRoute = require('./router/jobRoute')
const cors = require('cors')
const authRoute = require('./router/authRoute')
const cookieParser = require('cookie-parser');

//middleware
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Hello! from job-portal-server")
})


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xratx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const database = client.db("JobPortal")
        const jobCollection = database.collection("JobCollection")
        //router
        app.use('/api', createJobRoute(jobCollection))
        app.use('/api', authRoute)

        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
    console.log(`Press Ctrl+C to stop server`)
})
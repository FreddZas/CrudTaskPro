import express from "express";
import db from "./utils/database.js";
import All from "./models/allModels.js";
import "dotenv/config.js";
import cors from "cors";

All;

// NODE SERVER

const PORT = process.env.PORT ?? 8000;

// Database Connection;

db.authenticate()
    .then(() => {console.log('Successful connection ✅')})
    .catch(error => console.log(error))

// Database synchronization

db.sync()
    .then(() => {console.log('Proper database synchronization... 👍')})
    .catch(error => console.log(error))

// Developing Express

const app = express();
app.use(express.json());
app.use(cors());

//healthy check
app.get('/', (req,res) => {
    res.send('OK')
});

// ----- Developing endpoints -----
// GET to obtain all taks using "/all" route

app.get('/all', async (req, res) => {
    try {
        const all = await All.findAll()
        res.json(all)
    } catch (error) {
        res.status(400).json(error)
    };
});


// GET to obtain a task from id using "/all/:id"
// Using path params
app.get("/all/:id",async (req , res) => {
    try {
        const {id} = req.params
        const all = await All.findByPk(id)
        res.json(all)
    } catch (error) {
        res.status(400).json(error)
    };
});

// POST to create a new task using "/all" route
app.post('/all' , async (req , res ) => {
    try {
        const {body} = req
        // Sending information to database (INSERT INTO)
        const all = await All.create(body)
        res.status(201).json(all)
    } catch (error) {
        res.status(400).json(error)
    };
});

// PUT to update a task using "/all/:id"
app.put('/all/:id', async (req,res) => {
    try {
        const {id} = req.params
        const{body} = req
        // First obj.: Information
        // Second obj.: WHERE
        const all = await All.update(body,{
            where: {id}
        })
        res.json(all)
    } catch (error) {
        res.status(400).json(error)
    };
});

// DELETE to delete a task by id using "/all/:id"
app.delete('/all/:id', async (req, res) => {
    try {
        const {id} = req.params
        await All.destroy({
            where: {id}
        })
        // Ends the request
        res.status(204).end()
    } catch (error) {
        res.status(400).json(error)
    };
});





// SERVER
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 😎`)
})
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;
const userModel = require('./src/models/users');
const taskModel = require('./src/models/Task');
const taskRoute = require('./src/routes/taskRoute.js');
const authRoute = require('./src/routes/authRoute.js');
const morgan = require('morgan');

//set static folder
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(morgan('dev'));
mongoose.connect('mongodb+srv://snigdharanipanigrahy1:gu0gAIoGMoXaOljj@cluster0.kzjve.mongodb.net/Test?retryWrites=true&w=majority&appName=Cluster0', {useNewUrlParser: true, useUnifiedTopology: true})
app.get('/users', (req, res) => {
    userModel.find({})
    .then((users) => {
        res.json(users)
    })
    .catch((err) => {
        res.send(err)
    })
})
app.use('', taskRoute);
app.use('/auth', authRoute);

app.post('/api/tasks', async (req, res) => {
    try {
        const task = req.body;
        console.log('Received task:', task); // Log the request body
        const newTask = new taskModel(task);
        await newTask.save();
        res.json(newTask);
    } catch (error) {
        console.error('Error saving task:', error);
        res.status(500).json({ error: 'An error occurred while saving the task.' });
    }
})
app.listen (PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

// app.get('/api/tasks', (req, res) => {
//     taskModel.find({})
//     .then((tasks) => {
//         res.json(tasks)
//     })
//     .catch((err) => {
//         res.send(err)
//     })
// })

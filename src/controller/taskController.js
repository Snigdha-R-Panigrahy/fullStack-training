const Task = require('../models/Task.js');

const createTasks = async (req, res) => {
    try {
        const task = req.body;
        console.log('Received task:', task); // Log the request body
        const newTask = new Task(task);
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error saving task:', error);
        res.status(500).json({ error: 'An error occurred while saving the task.' });
    }
};
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = req.body;
        const updatedTask = await Task.findByIdAndUpdate
        (id, task, { new: true });
        res.json(updatedTask);
    }
    catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'An error occurred while updating the task.' });
    }
}
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.json({ message: 'Task deleted successfully' });
    }
    catch (error){
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'An error occurred while updating the task.' });
    }
}
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching tasks.' });
    }
};
const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        res.json(task);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching task.' });
    }
}

module.exports = {
    getTasks,
    getTaskById,
    createTasks,
    updateTask,
    deleteTask
};
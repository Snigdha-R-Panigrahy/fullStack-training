const auth = require('../models/auth.js');
const createError = require('http-errors');

const register = async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        console.log('Received user:', userName ); // Log the request body
        const userExists = await auth.findOne({ userName : userName });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = new auth({ userName, password });
        const SavedUser = await user.save();
        res.json(SavedUser);
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: 'An error occurred while saving the user.' });
    }
}
const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        const user = await auth.findOne({userName});
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, userName: user.userName
        }, 'secret', { expiresIn: '1h' });
        res.json({ token });
    }
    catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'An error occurred while logging in.' });
    }
}
const logout = async (req, res) => {
    req.logout();
    res.redirect('/');
}

module.exports = {
    login,
    register,
    logout
};

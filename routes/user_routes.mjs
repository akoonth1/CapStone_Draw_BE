import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import connectToDatabase from '../config/db.mjs';
import User from '../models/UsersSchema.mjs';




dotenv.config();

const user_router = express.Router();

// Connect to the database
connectToDatabase();

//Create a user
user_router.post('/user', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User uploaded successsfully.' })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' })
    }
});


user_router.get('/userlist', async (req, res) => {
    try {
        const userslist = await User.aggregate([
            [
                {
                  '$project': {
                    'name': 1, 
                    '_id': 1
                  }
                }
              ]
        ]);
        res.json(userslist);
    } catch (error) {
        res.status(500).send('Error retrieving users: ' + error.message);
    }
});


user_router.get('/userlist/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userslist = await User.aggregate([
            {
                '$match': { '_id': new mongoose.Types.ObjectId(id) }
            }
        ]);
        res.json(userslist);
    } catch (error) {
        res.status(500).send('Error retrieving users: ' + error.message);
    }
});


user_router.put('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const user = await
        User.findByIdAndUpdate(id, {
            name, email, password
        });
        res.json({ message: 'User updated successfully.' });
    } catch (error) {
        res.status(500).send('Error updating user: ' + error.message);
    }
}
);

user_router.delete('/user/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.json({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).send('Error deleting user: ' + error.message);
    }
});


export default user_router;     
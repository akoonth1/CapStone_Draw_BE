import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import connectToDatabase from '../config/db.mjs';
import User from '../models/UsersSchema.mjs';
import { Schema } from 'mongoose';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth.mjs';





dotenv.config();

const user_router = express.Router();

// Connect to the database
// connectToDatabase();

//Create a user
// user_router.post('/user', async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         const user =  new User({ name, email, password });
//         await user.save();
//         res.status(201).json({ message: 'User uploaded successsfully.' })
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error.' })
//     }
// });

user_router.post('/user', 
[   check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
]
    , async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body;

        try {

            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ message: 'User already exists.' });
            }

            user = new User({
                name,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            }
            // console.log('Payload:', payload);

            jwt.sign(payload, process.env.jwtPrivateKey ,
                { expiresIn: 36000 }, 
                (error, token) => {
                    if (error) throw error;
                    // console.log('Token:', token);
                    res.json({ token });
                }
            );

        } catch (error) {
            res.status(500).json({ message: 'Internal server error.' });
        }
    }
);




//Get all user information
// user_router.get('/user/:id', (req, res) => {
//     try {
//         const { id } = req.params;
//         const user = User.findById(id);
//         res.json(user);
//     } catch (error) {
//         res.status(500).send('Error retrieving user: ' + error.message);
//     }
// });



user_router.get('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // // Validate the ID format (optional but recommended)
        // if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        //     return res.status(400).json({ message: 'Invalid user ID format.' });
        // }

        // Find the user by ID
        const user = await User.findById(id).select('-password'); // Exclude password

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Send the user data as JSON
        res.json(user);
    } catch (error) {
        console.error('Error retrieving user:', error.message);
        res.status(500).json({ message: 'Internal server error.', error: error.message });
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
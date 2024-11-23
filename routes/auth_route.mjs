

import express from 'express'; 
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import User from '../models/UsersSchema.mjs';
import { errorHandler } from '../middleware/errors_are_mid.mjs';
import bcrypt from 'bcryptjs';
import auth from '../middleware/auth.mjs';
import { check, validationResult } from 'express-validator';
import { Schema } from 'mongoose';

dotenv.config();


const router = express.Router();

// Get user information with auth token

router.get('/user', auth, async (req, res) => {
    try {
        // Get user information from the database name and email
        const user = await User.findById(req.user.id).select('-password');

        res.json(user);
    } catch (error) {
        res.status(500).send('Error retrieving user: ' + error.message);
    }
});


router.post('/user', 
[
   
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').not().isEmpty(),
]
, async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
            const { email, password } = req.body;
    try {
      

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        // Check if the password is correct

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, process.env.jwtPrivateKey , { expiresIn: 36000 }, (error, token) => {
            if (error) throw error;
            res.json({ token });
        });




    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
}
);

export default router;



    //     if (user) {
    //         return res.status(400).json({ message: 'User already exists.' });
    //     }
    //     user = new User({email, password });
    //     const salt = await bcrypt.genSalt(10);
    //     user.password = await bcrypt.hash(password, salt);
    //     await user.save();
    //     const payload = {
    //         user: {
    //             id: user.id
    //         }
    //     }
    //     jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (error, token) => {
    //         if (error) throw error;
    //         res.json({ token });
    //     });
    // } catch (error) {
    //     res.status(500).json({ message: 'Internal server error.' });
    // }
    // });



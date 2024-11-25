

import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
//For external Api  requirements
//Orignally used palett.es but it was not working so I used colormind.io

dotenv.config();

const color_router = express.Router();

// Colormind API URL
const url = 'http://colormind.io/api/';


color_router.get('/color', async (req, res) => {
    
    const data = {
        model: "default",
        input: [
            [44, 43, 44],
            [90, 83, 82],
            "N",
            "N",
            "N"
        ]
    };

//Example data from the Colormind API documentation
    try {

        // Make a POST request to the Colormind API
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

      
        if (!response.ok) {
       
            throw new Error(`Failed to fetch colors: ${response.status} ${response.statusText}`);
        }

      
        const colors = await response.json();

       
        res.json(colors);
    } catch (error) {
        console.error('Error fetching colors:', error.message);
      
        res.status(500).json({ error: 'Internal server error.', message: error.message });
    }
});

export default color_router;
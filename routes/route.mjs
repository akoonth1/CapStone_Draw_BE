import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import connectToDatabase from '../config/db.mjs';
import Blob from '../models/drawblobschema.mjs';
import multer from 'multer';



dotenv.config();

const router = express.Router();

// Connect to the database
connectToDatabase();


// // Route to write blob object to the database
// router.post('/blob', async (req, res) => {
//   try {
//     const { data, contentType } = req.body;
//     const blob = new BlobModel({ data: Buffer.from(data, 'base64'), contentType });
//     await blob.save();
//     res.status(201).send('Blob saved successfully');
//   } catch (error) {
//     res.status(500).send('Error saving blob: ' + error.message);
//   }
// });

// Route to read blob object from the database
// router.get('/blob/:id', async (req, res) => {
//   try {
//     const blob = await BlobModel.findById(req.params.id);
//     if (!blob) {
//       return res.status(404).send('Blob not found');
//     }
//     res.set('Content-Type', blob.contentType);
//     res.send(blob.data);
//   } catch (error) {
//     res.status(500).send('Error retrieving blob: ' + error.message);
//   }
// });

// export default router;


// Configure multer for file uploads (memory storage)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});



// POST route to handle blob upload
router.post('/blob/', upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }

      console.log('Received file:', req.file);

      // Verify that req.file.buffer is a Buffer
      if (!Buffer.isBuffer(req.file.buffer)) {
        return res.status(400).json({ error: 'Uploaded file data is not a buffer.' });
      }
  

      // Create a new Blob document
      const newBlob = new Blob({
        data: req.file.buffer,
        contentType: req.file.mimetype,
      });
  
      // Save the Blob to MongoDB
      await newBlob.save();
  
      res.status(201).json({ message: 'File uploaded successfully.', blobId: newBlob._id });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });
  

  // GET route to retrieve blob by ID
router.get('/blob/:id', async (req, res) => {
    try {
      const blob = await Blob.findById(req.params.id);
  
      if (!blob) {
        return res.status(404).json({ error: 'Blob not found.' });
      }
  
      res.set('Content-Type', blob.contentType);
      res.send(blob.data);
    } catch (error) {
      console.error('Error fetching blob:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });



//Get all blob IDs
router.get('/blobs', async (req, res) => {
    try {
      const blobs = await Blob.find({}, '_id');
      res.json(blobs);
    } catch (error) {
      console.error('Error fetching blobs:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });



  export default router;
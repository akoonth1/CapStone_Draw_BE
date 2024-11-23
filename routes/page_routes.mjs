import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import connectToDatabase from '../config/db.mjs';
import Blob from '../models/drawblobschema.mjs';
import multer from 'multer';



dotenv.config();

const page_router = express.Router();

// Connect to the database
// connectToDatabase();


// Configure multer for file uploads (memory storage)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});



// POST route to handle blob upload
page_router.post('/blob/', upload.single('file'), async (req, res) => {
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
        pictureName: req.file.originalname,
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
  page_router.get('/blob/:id', async (req, res) => {
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
page_router.get('/blobs', async (req, res) => {
    try {
      const blobs = await Blob.find({}, '_id');
      res.json(blobs);
    } catch (error) {
      console.error('Error fetching blobs:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });

// Get all blob IDs
page_router.get('/blobslist', async (req, res) => {
    try {
      const result = await Blob.aggregate([
        {
          '$group': {
            '_id': null,
            'ids': {
              '$push': '$_id'
            }
          }
        },
        {
          '$project': {
            '_id': 0,
            'ids': 1
            
          }
        }
      ]);
  
      res.json(result[0]?.ids || []);
    } catch (error) {
      console.error('Error fetching blobs:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });


// GET route to retrieve pictureName by ID
page_router.get('/blob/:id/pictureName', async (req, res) => {
    const { id } = req.params;
  
    try {
      const blob = await Blob.findById(id, 'pictureName');
  
      if (!blob) {
        return res.status(404).json({ message: 'Blob not found.' });
      }
  
      res.status(200).json({ pictureName: blob.pictureName });
    } catch (error) {
      console.error('Error retrieving pictureName:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });



  
  

//Edit blob by ID
page_router.put('/blob/:id', upload.single('data'), async (req, res) => {
    const { id } = req.params;
    const { pictureName, contentType } = req.body;
    const file = req.file;
  
    if (!file || !pictureName || !contentType) {
      return res.status(400).json({ message: 'data, pictureName, and contentType are required.' });
    }
  
    try {
      const updatedBlob = await Blob.findByIdAndUpdate(
        id,
        {
          data: file.buffer,
          contentType,
          pictureName,
        }
      );
  
      if (!updatedBlob) {
        return res.status(404).json({ message: 'Image not found.' });
      }
  
      res.status(200).json({ message: 'Image updated successfully.' });
    } catch (error) {
      console.error('Error updating image:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });

// DELETE route to delete blob by ID
page_router.delete('/blob/:id', async (req, res) => {
    try {
      const blob = await Blob.findByIdAndDelete(req.params.id);
  
      if (!blob) {
        return res.status(404).json({ error: 'Blob not found.' });
      }
  
      res.json({ message: 'Blob deleted successfully.' });
    } catch (error) {
      console.error('Error deleting blob:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });

  export default page_router;
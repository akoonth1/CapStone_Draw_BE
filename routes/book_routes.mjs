import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import connectToDatabase from '../config/db.mjs';
import Book from '../models/BookSchema.mjs';




dotenv.config();

const book_router = express.Router();

// Connect to the database
// connectToDatabase();

book_router.get('/test', (req, res) => {
    res.send('Hello World!');
}

);

// Create a book
book_router.post('/book', async (req, res) => {
    try {
        const { title, BookID, PagesArray, TextArray, PositionArray, createdBy } = req.body;
        const book = new Book({ title, BookID, PagesArray, TextArray, PositionArray, createdBy, Public: true });
        
    await book.save();
        res.status(201).json({ message: 'Book uploaded successsfully.' })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' })
    }
});


// GET route to retrieve a book by ID
book_router.get('/book/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).send('Book not found');
        }

        res.json(book);
    } catch (error) {
        res.status(500).send('Error retrieving book: ' + error.message);
    }
});



// DELETE route to delete a book by ID
book_router.delete('/booklist/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).send('Book not found');
        }

        res.status(200).send('Book deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting book: ' + error.message);
    }
});


// PUT route to update a book by ID
book_router.put('/booklist/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, BookID, PagesArray, TextArray, PositionArray } = req.body;
        const updatedBook = await Book
            .findByIdAndUpdate(id, { title, BookID, PagesArray, TextArray, PositionArray });

        if (!updatedBook) { 
            return res.status(404).send('Book not found');
        }

        res.status(200).send('Book updated successfully');  
    } catch (error) {    
        res.status(500).send('Error updating book: ' + error.message);
    }
}
);


book_router.get('/booklist', async (req, res) => {
    try {
        const bookslist = await Book.aggregate([
            [
                {
                  '$project': {
                    'title': 1, 
                    '_id': 1
                  }
                }
              ]
        ]);
        res.json(bookslist);
    } catch (error) {
        res.status(500).send('Error retrieving books: ' + error.message);
    }
});

//Booklist Route

book_router.get('/booklist/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const bookslist = await Book.aggregate([
            {
                '$match': { '_id': new mongoose.Types.ObjectId(id) }
            },
            {
                '$project': {
                    'PagesArray': 1,
                    'TextArray': 1

                }
            }
        ]);

        if (bookslist.length === 0) {
            return res.status(404).send('Book not found');
        }
        //console.log(bookslist);
        res.json(bookslist//[0].PagesArray
        );
        
    } catch (error) {
        res.status(500).send('Error retrieving pages: ' + error.message);
    }
});




// User's books
book_router.get('/book/by/:id', /* auth, */ async (req, res) => { // Update for auth usage 
    try {
        const { id } = req.params;

    
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID format.' });
        }

        const bookslist = await Book.aggregate([
            {
                '$match': {
                    'createdBy': new mongoose.Types.ObjectId(id) 
                }
            },
            {
                '$group': {
                    '_id': '$createdBy',
                    'books': { '$push': '$$ROOT' } 
                }
            }
        ]);

        if (bookslist.length === 0) {
            return res.status(404).json({ message: 'No books found for the given user.' });
        }

     
        res.status(200).json({ books: bookslist[0].books });

    
    } catch (error) {
        console.error('Error retrieving books:', error.message);
        res.status(500).json({ message: 'Error retrieving books.', error: error.message });
    }
});




//Booklist Route

book_router.get('/booklistcovers', async (req, res) => {
    try {
        const { id } = req.params;
        const bookslist = await Book.aggregate(
            [
                {
                  '$project': {
                    'title': 1, 
                    'firstPageElement': {
                      '$arrayElemAt': [
                        '$PagesArray', 0
                      ]
                    }
                  }
                }
              ]
        );

        if (bookslist.length === 0) {
            return res.status(404).send('Book not found');
        }

        res.json(bookslist);
    } catch (error) {
        res.status(500).send('Error retrieving pages: ' + error.message);
    }
});




book_router.put('/book/:id/textarray', async (req, res) => {
    try {
        const { id } = req.params;
        const { TextArray } = req.body;
        const updatedBook = await Book
            .findByIdAndUpdate(id, { TextArray });

        if (!updatedBook) {
            return res.status(404).send('Book not found');
        }

        res.status(200).send('Book updated successfully');
    } catch (error) {

        res.status(500).send('Error updating book: ' + error.message);
    }   
}   

);

book_router.put('/book/:id/title', async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const updatedBook = await Book
            .findByIdAndUpdate(id, { title });

        if (!updatedBook) {
            return res.status(404).send('Book not found');
        }

        res.status(200).send('Book updated successfully');
    } catch (error) {

        res.status(500).send('Error updating book: ' + error.message);
    }   
}   

);





// User's books
book_router.get('/book/PageChecker/:Pid', async (req, res) => { 
    try {
        const { Pid } = req.params;

        // Validate the page ID format
        if (!mongoose.Types.ObjectId.isValid(Pid)) {
            return res.status(400).json({ message: 'Invalid page ID format.' });
        }

        const pageId = Pid.toString();

        // Aggregation pipeline to check if Books contain the page ID
        const bookslist = await Book.aggregate([
            {
                '$project': {
                    '_id': 1,
                    'title': 1,
                    'containsPage': {
                        '$in': [pageId, '$PagesArray']
                    }
                }
            },
            {
                '$match': {
                    'containsPage': true
                }
            }
        ]);

        if (bookslist.length === 0) {
            return res.status(404).json({ message: 'No books found containing the given page.' });
        }

        res.status(200).json({ books: bookslist });

    } catch (error) {
        console.error('Error retrieving books:', error.message);
        res.status(500).json({ message: 'Error retrieving books.', error: error.message });
    }
});











export default book_router;
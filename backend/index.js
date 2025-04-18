import express from "express"
import cors from "cors"
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import {
    addUser,
    validateUser,
    addListing,
    getListings,
    getListingById,
    getListingsByOwner,
    deleteListing,
} from './memoryDB.js';

// Get the directory name from the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const uniqueName = `book-${Date.now()}${ext}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
});

const app = express()
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => {
    res.json("He")
})

//*Auth EndPoints (Register)
app.post('/register', async (req, res) => {
    try {
        const { name, email, password, mobile, role } = req.body;

        if (!name || !email || !password || !mobile || !role) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newUser = await addUser({ name, email, password, mobile, role });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});


//* Auth Endpoint (Login)
app.post('/login', async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const user = await validateUser(email, password, role);

        console.log("User login", user);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // In a real app, you'd return a token here
        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: 'Failed to login' });
    }
});


//*Get All Listings of the books
app.get("/books/listings", async (req, res) => {
    try {
        const allListings = await getListings();
        res.json({
            allListings: allListings
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to Load Books' });
    }
});


//* Added Books listings
app.post("/books/listings/add", upload.single('image'), async (req, res) => {
    try {
        const { title, author, genre, location, ownerContact } = req.body

        if (!title || !author || !genre || !location || !ownerContact) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        let imageUrl = null;
        if (req.file) {
            imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }

        const UserListings = await addListing({ title, author, genre, location, ownerContact, imageUrl })

        res.status(201).json(UserListings);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to Create Book Listings' });
    }
})


//* Get Books by id
app.get("/books/listings/:id", async (req, res) => {
    try {
        const bookId = req.params.id.toString().trim();
        const book = await getListingById(bookId);
        console.log("Fetching book with ID:", bookId);
        if (book) {
            res.json({
                book: book
            });
        }
        else {
            res.status(404).json({ error: "Book not found" });

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to find book with that ID" });
    }
})


//* Delete Books By id
app.delete("/books/listings/:id", async (req, res) => {
    try {
        const bookId = req.params.id;

        const response = await deleteListing(bookId);

        if (response) {
            res.status(200).json({ message: "Deleted Successfully" });
        } else {
            res.status(404).json({ error: "Book listing not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete book listing" });
    }
});


//* Get Books by Owner ID
app.get("/books/listings/user/:owner", async (req, res) => {
    try {

        const ownerId = req.params.owner;


        if (!ownerId) {
            return res.status(400).json({
                message: "Owner ID is required"
            });
        }


        const ownerBooks = await getListingsByOwner(ownerId)

        res.json({
            ownerBooks: ownerBooks
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete book listing" });
    }
})





app.listen(8000, () => console.log("Running on PORT 8000"))
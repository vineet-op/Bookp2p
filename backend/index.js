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
    updateListing,
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

const upload = multer({ storage });

const app = express()
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => {
    res.json("He")
})


//*Auth EndPoints (Register)
app.post('/register', async (req, res) => {
    const { name, email, password, mobileNumber, role } = req.body;

    if (!name || !email || !password || !mobileNumber || !role) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const newUser = await addUser({ name, email, password, mobileNumber, role });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});


//* Auth Endpoint (Login)
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = validateUser(email, password);

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


//* Add Books listings
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




app.listen(3000, () => console.log("Running on PORT 3000"))
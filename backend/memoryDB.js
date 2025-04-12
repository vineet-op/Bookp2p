
// Database
const db = {
    users: [],
    listings: [],
    // Add more collections if needed
};

// Helper functions
const generateId = () => Math.random().toString(36).substring(2, 9);

// User operations
export const addUser = (user) => {
    const newUser = {
        ...user,
        id: generateId(),
        createdAt: new Date(),
    };
    db.users.push(newUser);
    return newUser;
};

export const findUserByEmail = (email) => {
    return db.users.find(user => user.email === email);
};

export const validateUser = (email, password, role) => {
    return db.users.find(user => user.email === email && user.password === password && user.role === role);
};

// Listing operations
export const addListing = (listing) => {
    const newListing = {
        ...listing,
        id: generateId(),
        createdAt: new Date(),
        status: 'available', // Default status
    };
    db.listings.push(newListing);
    return newListing;
};

export const getListings = () => {
    return db.listings;
};

export const getListingById = (id) => {
    return db.listings.find(listing => listing.id === id);
};

export const getListingsByOwner = (ownerId) => {
    return db.listings.filter(listing => listing.ownerId === ownerId);
};

export const updateListing = (id, updates) => {
    const index = db.listings.findIndex(listing => listing.id === id);
    if (index === -1) return undefined;

    db.listings[index] = { ...db.listings[index], ...updates };
    return db.listings[index];
};

export const deleteListing = (id) => {
    const initialLength = db.listings.length;
    db.listings = db.listings.filter(listing => listing.id !== id);
    return db.listings.length !== initialLength;
};

// Seed some initial data if needed
export const seedDatabase = () => {
    // Add some test users
    addUser({
        name: 'Owner',
        email: 'owner@dev.com',
        password: 'password123',
        mobileNumber: '1234567890',
        role: 'owner',
    });
    addUser({
        name: 'Seller',
        email: 'seller@dev.com',
        password: 'password123',
        mobileNumber: '1234567890',
        role: 'seller',
    });

    // Add some test listings
    addListing({
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Classic',
        location: 'New York',
        ownerId: db.users[0].id,
        ownerContact: 'owner@example.com',
    });
};

// Initialize with some data (optional)
seedDatabase();


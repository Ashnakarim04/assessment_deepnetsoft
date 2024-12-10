// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3015;
// const path = require('path');
// const cors = require('cors');
// const mongoose = require('mongoose');
// require('dotenv').config();

// // Enable CORS
// app.use(cors());

// // MongoDB Connection String
// const mongodb = process.env.url;
// if (!mongodb) {
//     console.error("Error: MongoDB connection URL is missing in .env file.");
//     process.exit(1); // Exit if no connection URL is provided
// }

// // Middleware
// app.use(express.json());

// // Routes
// const route = require('./route');

// const menuRoute = require('./ROUTE/MenuRoute');
// app.use('/api/menu', menuRoute);

// const itemRoute = require('./ROUTE/ItemRoute');
// app.use('/api/items', itemRoute);

// app.use('/menu', require('./ROUTE/MenuRoute.js'));
// app.use('/items', require('./ROUTE/ItemRoute.js'));

// // MongoDB Connection
// mongoose.connect(mongodb)
//     .then(() => console.log("DB connected"))
//     .catch((error) => {
//         console.error("DB connection error:", error);
       
//     });

// // Start Server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });


const express = require('express');
const app = express();
const port = process.env.PORT || 3015;
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Enable CORS for frontend URL (localhost:5173)
app.use(cors({
    origin: 'http://localhost:5173',  // Allow requests only from this URL
    methods: 'GET,POST,PUT,DELETE',  // Define allowed methods
    credentials: true                 // Optional: if you need to include cookies in requests
}));

// MongoDB Connection String
const mongodb = process.env.MONGODB_URL;
if (!mongodb) {
    console.error("Error: MongoDB connection URL is missing in .env file.");
    process.exit(1); // Exit if no connection URL is provided
}

// Middleware
app.use(express.json());

// Routes
const menuRoute = require('./ROUTE/MenuRoute');
app.use('/api/menu', menuRoute);

const itemRoute = require('./ROUTE/ItemRoute');
app.use('/api/items', itemRoute);

// MongoDB Connection
mongoose.connect(mongodb)
    .then(() => console.log("DB connected"))
    .catch((error) => {
        console.error("DB connection error:", error);
    });

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

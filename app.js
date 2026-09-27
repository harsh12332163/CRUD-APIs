const express = require('express');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Built-in middleware to parse JSON request bodies (needed for later steps)
app.use(express.json());

// Mount the router for the /students resource
app.use('/students', studentRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
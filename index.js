const express = require("express");
const app = express();

// Simple log function
const log = console;

// Start the Goat.js file directly instead of spawning a child process
try {
    require("./Goat.js");
    log.info("Goat.js started successfully");
} catch (err) {
    log.error("Error starting Goat.js:", err);
}

// Set up the server to listen on a port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

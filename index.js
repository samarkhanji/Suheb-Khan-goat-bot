/**
 * @author NTKhang
 * ! The source code is written by NTKhang, please don't change the author's name everywhere. Thank you for using
 * ! Official source code: https://github.com/ntkhang03/Goat-Bot-V2
 */

const { spawn } = require("child_process");
const log = require("./logger/log.js");
const express = require("express");
const app = express();

// Start Project
function startProject() {
    const child = spawn("node", ["Goat.js"], {
        cwd: __dirname,
        stdio: ["pipe", "pipe", "pipe"],  // Inherit hata diya aur custom logging add kiya
        shell: false // shell disable kiya to avoid hidden logs
    });

    // Process Output Logging
    child.stdout.on("data", (data) => {
        console.log(`📜 STDOUT: ${data.toString()}`);
    });

    child.stderr.on("data", (data) => {
        console.error(`🚨 STDERR: ${data.toString()}`);
    });

    child.on("close", (code) => {
        console.log(`❌ Process exited with code: ${code}`);
        if (code === 2) {
            log.info("🔄 Restarting Project...");
            startProject();
        }
    });
}

// Start the Goat.js project
startProject();

// Set up the Express server
const PORT = process.env.PORT || 3001;
app.get("/", (req, res) => {
    res.send("✅ Server is running...");
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

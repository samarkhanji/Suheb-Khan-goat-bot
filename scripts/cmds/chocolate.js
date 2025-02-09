const fs = require("fs-extra");
const path = require("path");

module.exports = {
    config: {
        name: "chocolate",
        version: "1.0",
        author: "Priyansh Rajput",
        countDown: 5,
        role: 0,
        description: "Detects sweet-related keywords and sends a message with a photo.",
        category: "fun",
        guide: {
            vi: "{pn} chocolate: Gửi thông điệp về chocolate với ảnh.",
            en: "{pn} chocolate: Send a message about chocolate with a photo."
        }
    },

    langs: {
        vi: {
            replyMessage: "Đây là chocolate 🍫 dành cho bạn!",
        },
        en: {
            replyMessage: "Here's some chocolate 🍫 for you!",
        }
    },

    onStart: async function ({ message, event, getLang }) {
        const sweetWords = ["chocolate", "toffee", "candy"];
        const userMessage = event.body.toLowerCase();

        // Check if the user's message contains any sweet-related word
        if (sweetWords.some(word => userMessage.includes(word))) {
            // Define the path to the chocolate.jpg image in the cache folder
            const imagePath = path.join(__dirname, "cache", "chocolate.jpg");

            // Check if the image exists
            if (fs.existsSync(imagePath)) {
                // Send the message and the image
                return message.reply(getLang("replyMessage"), { attachment: fs.createReadStream(imagePath) });
            } else {
                return message.reply("Sorry, I couldn't find the chocolate image.");
            }
        }
    }
};

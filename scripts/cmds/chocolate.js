const fs = require("fs");

module.exports = {
  config: {
    name: "Chocolate",
    version: "1.0",
    author: "Priyansh Rajput",
    countDown: 2,
    role: 0,
    description: "Sends a chocolate image when triggered.",
    category: "box chat",
  },

  handleEvent: function ({ api, event }) {
    var { threadID, messageID, body } = event;
    if (["Chocolate", "chocolate", "Toffe", "toffe"].some((v) => body && body.startsWith(v))) {
      const imagePath = __dirname + "/tmp/chocolate.jpg";
      
      if (fs.existsSync(imagePath)) {
        var msg = {
          body: "Ye lo chocolate 🍫",
          attachment: fs.createReadStream(imagePath),
        };
        api.sendMessage(msg, threadID, (err, info) => {
          if (!err) {
            api.setMessageReaction("🍫", info.messageID, () => {}, true);
          }
        });
      } else {
        console.error('The file "chocolate.jpg" does not exist in the cache directory.');
        api.sendMessage({ body: "An error occurred while trying to send the chocolate image." }, threadID);
      }
    }
  },

  onStart: function ({ api, event }) {
    // This function is currently unused but can be utilized for initialization logic if needed.
  },
};

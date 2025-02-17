const fs = require("fs-extra");

module.exports = {
  config: {
    name: "tea",
    version: "1.0",
    author: "Priyansh",
    countDown: 5,
    role: 0,
    shortDescription: "no-prefix",
    longDescription: "Bot Will Reply You In Engish/Bangla Language",
    category: "no prefix",
    guide: {
      en: "{p}{n}",
    }
  },

  onStart: async function ({ }) { },

  onChat: async function ({ api, event }) {
    var { threadID, messageID } = event;
    const lowerMessage = event.body.toLowerCase();

    if (lowerMessage.includes("tea") || lowerMessage.includes("TEA") || lowerMessage.includes("chai")) {
      const imagePath = __dirname + "/cache/tea.mp4";

      if (fs.existsSync(imagePath)) {
        return api.sendMessage({
          body: "Ye lo aapki chai pyar se banaya hu apne chote chote hatho se \n📛😋😋😋😋😋😋",
          attachment: fs.createReadStream(imagePath)
        }, threadID, messageID);
      } else {
        return api.sendMessage("❌ Error: tea file missing !", threadID, messageID);
      }
    }
  }
};

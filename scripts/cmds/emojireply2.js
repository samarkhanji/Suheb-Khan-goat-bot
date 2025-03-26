module.exports = {
  config: {
    name: "emojiReply2",
    version: "2.0",
    author: "Your Name",
    description: "Super funny emoji-based auto-reply",
    category: "no prefix",
    cooldown: 3
  },

  onStart: async function () {
    // Empty function taaki bot install ho sake
  },

  onChat: async function ({ api, event }) {
    const { threadID } = event;

    // 🔥 MAZEDAAR EMOJI REPLIES 🔥
    const emojiReplies = {
      "😂": [
        "Hasi rok nahi pa raha! 🤣🤣",
        "Ek aur joke maar do babu! 😁",
        "Babu comedy show shuru ho gaya kya? 😂",
        "Joke sunke pet dukh raha hai! 🤪"
      ],
      "😎": [
        "Babu full style me hai! 😎🔥",
        "Attitude level: 100% 😏",
        "Yeh banda swag me rehta hai! 🤩",
        "Style maarna bandh kar! 😂"
      ],
      "❤️": [
        "Dil se dil tak! ❤️🔥",
        "Pyaar mohabbat zindabad! 💘",
        "Mujhe bhi pyaar karo yaar! 🥺",
        "Bas kar, ab to shaadi bhi karlo! 💍😂"
      ],
      "👍": [
        "Babu ne approve de diya! 👍🔥",
        "Sahi hai babu! 👌",
        "Keep rocking! 🤟🔥",
        "Aaj kuch to bada hone wala hai! 😏"
      ],
      "🔥": [
        "Aag laga di babu! 🔥🔥",
        "Babu pura danger zone me hai! 😎🔥",
        "Lagta hai gas cylinder phat gaya! 💣🔥",
        "Arre, fire brigade bulaun kya? 🚒"
      ],
      "👊": [
        "Babu full fighter mode me hai! 👊🔥",
        "Kaun fight kar raha hai bhai? 😆",
        "Bhai boxing ring me aane wala hai! 🥊",
        "Arre bhai, pehle practice to kar! 😂"
      ]
    };

    // User ka message
    const userMessage = event.body ? event.body.trim() : "";

    // Check karo ki message ek ya multiple same emojis ka combination hai
    for (let emoji in emojiReplies) {
      const regex = new RegExp(`^${emoji}+$`); // Same emoji ke repetition ko match karega
      if (regex.test(userMessage)) {
        const replies = emojiReplies[emoji];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        return api.sendMessage(randomReply, threadID);
      }
    }
  }
};

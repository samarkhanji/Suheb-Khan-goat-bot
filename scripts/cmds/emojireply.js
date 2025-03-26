module.exports = {
  config: {
    name: "emojiReply",
    version: "2.1",
    author: "Your Name",
    description: "Funny emoji-based auto-reply",
    category: "no prefix",
    cooldown: 3
  },

  onStart: async function () {
    return {}; // Ensure onStart properly returns
  },

  onChat: async function ({ api, event }) {
    const { threadID, body } = event;

    if (!body) return;

    // Extract emojis from message
    const emojiMatch = [...body].filter(char => /\p{Emoji}/u.test(char));

    if (!emojiMatch.length) return;

    const emoji = emojiMatch[0];

    // Emoji responses
    const emojiReplies = {
      "😘": ["Arre babu, itna pyaar! Dil garden garden ho gaya! 🌸😂", "Mwah mwah! Yeh kaunsa naye pyaar ka signal hai? 💋😂"],
      "😒": ["Ye kya nakhre hai babu? Shahzada mode on hai kya? 👑😂", "Itni attitude? Lagta hai data pack khatam ho gaya! 📵😆"],
      "👀": ["Aankhon se laser nikal rahi hai kya? 🔥👀", "Kya dekh raha hai babu? Free show nahi hai yeh! 🎭😂"],
      "😈": ["Babu full shaitani mode me hai! Aaj kiski class lagane wala hai? 👹🔥", "Lagta hai kisi ke dimaag me khatarnaak plan chal raha hai! 😈😏"],
      "💋": ["Arre wah, babu romance mode me hai! Bollywood hero ban raha kya? 💖😂", "Itni lip emoji? Lagta hai babu full love zone me hai! 💋🔥"],
      "🥶": ["Babu fridge me beth gaya kya? AC band kar warna ice cube ban jayega! 🧊😂", "Itni thand? Snowman bhi sharma gaya! ⛄😆"],
      "😹": ["Billi bhi hasi se gutargun kar rahi hai! Meow meow stand-up comedy dekh rahi hai kya? 🐈😂", "Billi bhi memes dekhne lagi hai! Pura comedy ka mahaul hai! 😹🎭"],
      "👊": ["Babu full fighting mode me hai! 🥊🔥", "Abe yeh kya, boxing ring me aa gaya kya? 🤜💥"],
      "😁": ["Babu full khush lag raha hai! Koi special baat hai kya? 😁🎉", "Itni badi smile? Lagta hai chhupa treasure mil gaya! 🏆😁"]
    };

    if (emojiReplies[emoji]) {
      const replies = emojiReplies[emoji];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      api.sendMessage(randomReply, threadID);
    }
  }
};

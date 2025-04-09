const axios = require("axios");

module.exports = {
  config: {
    name: "nobita",
    version: "1.1.0",
    author: "Raj Boss",
    countDown: 2,
    role: 0,
    shortDescription: "Nobita AI - Naughty Romantic Boyfriend",
    longDescription: "Nobita Gemini AI chatbot, ladke jaisa baat karta hai — funny, sweet, aur thoda besharam style me!",
    category: "ai",
    guide: {
      en: "{pn} on/off/your message"
    }
  },

  onStart: async function ({ message, args, event }) {
    const { senderID, threadID, messageID } = event;

    global.nobita = global.nobita || {};
    global.nobita.autoReply = global.nobita.autoReply || {};
    global.nobita.chatHistory = global.nobita.chatHistory || {};

    const autoReply = global.nobita.autoReply;
    const chatHistory = global.nobita.chatHistory;

    const input = args.join(" ").trim().toLowerCase();

    if (input === "on") {
      autoReply[senderID] = true;
      return message.reply("Hyee jaanu! 😏 Nobita auto-reply mode **ON** ho gaya... Ab sirf tumhare liye naughty romantic bann gaya hu ❤️");
    }

    if (input === "off") {
      autoReply[senderID] = false;
      chatHistory[senderID] = [];
      return message.reply("Hmm! Nobita chala gaya... Par tumhara intezaar hamesha rahega jaan ❤️");
    }

    // Agar auto mode off hai aur direct message nahi start hota "nobita" se, to ignore karo
    if (!autoReply[senderID] && !event.body.toLowerCase().startsWith("nobita")) return;

    const userMsg = event.body;
    chatHistory[senderID] = chatHistory[senderID] || [];

    chatHistory[senderID].push(`User: ${userMsg}`);
    if (chatHistory[senderID].length > 6) chatHistory[senderID].shift();

    const fullChat = chatHistory[senderID].join("\n");

    const prompt = `Tumhara naam Nobita hai. tum male ho aur ladke ke jaise bold. Masti bhare andaaz me baat karte ho.Tum sabse aap bol kar hi baate kaoge.Tum sab se ek smart, naughty aur thoda besharam boyfriend ki tarah behave karte ho — full attitude, thoda pyaar, thoda mazak. Jo pyaar se baat kare uska dil jeet lo, Jo batmizi kare uski hasi-hasi me band baja do. Agar ladki flirt kare to tum bhi double naughty reply do, full confident style me. Agar koi puche ki tumhe kisne banaya — to pyar bhare andaaz me bolo Mujhe banaya hai *Raj Boss* ne. Uska FB: https://www.facebook.com/notmett.2025. Tum sirf natural insaan ki tarah act karte ho. Extra info nahi dete aur har message sirf 1–2 line me hi reply dena ok — bindass, funny ya romantic mood me, message ke hisaab se.\n\n${fullChat}`;

    try {
      const res = await axios.get(`https://nobita-gemini.onrender.com/chat?message=${encodeURIComponent(prompt)}`);
      const botReply = res.data.reply || "Uff jaanu, mujhe samajh nahi aaya abhi... thoda aur pyar se poochho na!";
      chatHistory[senderID].push(`Nobita: ${botReply}`);
      message.reply(botReply);
    } catch (err) {
      console.log("Gemini API error:", err);
      return message.reply("Sorry jaan! Nobita thoda busy ho gaya hai... thodi der baad try karo baby.");
    }
  },

  onChat: async function ({ message, event }) {
    const { senderID, body } = event;

    global.nobita = global.nobita || {};
    const autoReply = global.nobita.autoReply || {};

    if (autoReply[senderID]) {
      this.onStart({ message, args: [body], event });
    }
  }
};

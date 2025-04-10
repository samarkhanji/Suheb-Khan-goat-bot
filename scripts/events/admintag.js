module.exports = {
  config: {
    name: "admintag",
    eventType: ["message", "message_reply"],
    version: "1.0",
    credits: "Raj",
    description: "Replies when admin is tagged"
  },

  onEvent: async function ({ api, event }) {
    const adminIDs = ["100085303477541", "100001212940148"]; // yahan apne admin UID dalna

    if (!event.mentions) return;

    const mentionedIDs = Object.keys(event.mentions);
    const isAdminMentioned = mentionedIDs.some(id => adminIDs.includes(id));

    if (isAdminMentioned) {
      const responses = [
        "Mere Boss ko tag kyu kar rahe ho?",
        "Unko tag karne se pehle permission liya kya?",
        "Aree bhai, Boss busy hain!",
        "Boss ko tang mat karo, warna main aa jaunga!",
        "Tag kiya? Ab to bacha nahi tu!",
        "Bas karo bhai, unki shanti bhang mat karo."
      ];

      const randomReply = responses[Math.floor(Math.random() * responses.length)];
      return api.sendMessage(randomReply, event.threadID, event.messageID);
    }
  }
};

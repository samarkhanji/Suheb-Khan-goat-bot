module.exports = {
    config: {
        name: "admintag",
        version: "Falana-Version",
        author: "Priyanshi Kaur",
        countDown: 1,
        role: 0,
        description: {
            en: "Bot responds when admin is mentioned or when bot is tagged"
        },
        category: "admin",
        guide: { en: "Tag admin or bot to get a response" },
    },

    onStart: async function ({ api, message, event }) {
        message.reply("This command is automatically triggered when admins are mentioned.");
    },

    handleEvent: async function ({ api, event, message }) {
        const adminIds = ["100085303477541","100085303477541"];
        const botId = api.getCurrentUserID();
        const { mentions, senderID, threadID, messageID } = event;

        if (senderID === botId) return;

        const adminResponses = [
            "Boss is busy with his girlfriend, tell me what you need",
            "Why are you calling the boss?",
            "He might be busy right now",
            "Raj is offline 😝",
            "Admin is in a meeting, leave your message",
            "Boss is sleeping, don't disturb 😴",
            "Admin will get back to you soon 🔜",
            "Your message has been noted, admin will check later ✅"
        ];

        const botResponses = [
            "Yes, I'm here to help! 🤖",
            "How can I assist you? 💫",
            "Bot at your service! ⚡",
            "Need something? I'm here 🌟",
            "Command me, and I shall help! 🎯",
            "Beep boop! Bot activated 🔋"
        ];

        const mentionKeys = Object.keys(mentions);

        if (mentionKeys.length > 0) {
            let response = "";
            let shouldRespond = false;

            if (mentionKeys.includes(botId)) {
                response = botResponses[Math.floor(Math.random() * botResponses.length)];
                shouldRespond = true;
            }

            for (const adminId of adminIds) {
                if (mentionKeys.includes(adminId)) {
                    response = adminResponses[Math.floor(Math.random() * adminResponses.length)];
                    shouldRespond = true;
                    break;
                }
            }

            if (shouldRespond) {
                const currentTime = new Date().toLocaleTimeString();
                const replyMessage = `${response}\n\n⏰ Time: ${currentTime}`;
                
                message.reply(replyMessage);
                api.setMessageReaction("👀", messageID, null, true);
            }
        }
    }
};

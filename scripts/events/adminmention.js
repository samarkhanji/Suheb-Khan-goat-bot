module.exports = {
	config: {
		name: "admintag",
		version: "1.0",
		author: "Raj",
		description: "Reply when admin or bot is tagged",
	},

	handleEvent: async function ({ api, event }) {
		const adminIDs = ["100085303477541", "100085303477541"]; // Apne admin FB IDs daal lo
		const botID = api.getCurrentUserID();
		const { mentions, senderID, messageID, threadID } = event;

		if (senderID === botID || !mentions) return;

		const mentionIDs = Object.keys(mentions);
		let response = "";
		let reacted = false;

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
			"Yes, I'm here to help!",
			"How can I assist you?",
			"Bot at your service!",
			"Need something? I'm here!",
			"Command me, and I shall help!",
			"Beep boop! Bot activated!"
		];

		if (mentionIDs.includes(botID)) {
			response = botResponses[Math.floor(Math.random() * botResponses.length)];
			reacted = true;
		} else {
			for (let adminID of adminIDs) {
				if (mentionIDs.includes(adminID)) {
					response = adminResponses[Math.floor(Math.random() * adminResponses.length)];
					reacted = true;
					break;
				}
			}
		}

		if (reacted && response) {
			const time = new Date().toLocaleTimeString();
			await api.sendMessage(`${response}\n\n⏰ Time: ${time}`, threadID, messageID);
			await api.setMessageReaction("👀", messageID, () => {}, true);
		}
	}
};

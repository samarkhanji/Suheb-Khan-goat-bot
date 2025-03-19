const { getTime, drive } = global.utils;
const fs = require("fs");
const path = require("path");

module.exports = {
	config: {
		name: "leave",
		version: "1.4",
		author: "NTKhang",
		category: "events"
	},

	langs: {
		vi: {
			session1: "sáng",
			session2: "trưa",
			session3: "chiều",
			session4: "tối",
			leaveType1: "tự rời",
			leaveType2: "bị kick",
			defaultLeaveMessage: "{userName} đã {type} khỏi nhóm"
		},
		en: {
			session1: "morning",
			session2: "noon",
			session3: "afternoon",
			session4: "evening",
			leaveType1: "🥳 Ye Dar kar Bhag Gaya 😹😹",
			leaveType2: "𝗟'𝗮𝗱𝗺𝗶𝗻 𝗮̀ 𝘃𝗶𝗿𝗲 𝘂𝗻 𝗰𝗼𝗻",
			defaultLeaveMessage: "{userName} {type} Group sw"
		}
	},

	onStart: async ({ threadsData, message, event, api, usersData, getLang }) => {
		if (event.logMessageType == "log:unsubscribe") {
			const { threadID } = event;
			const threadData = await threadsData.get(threadID);
			if (!threadData.settings.sendLeaveMessage) return;

			const { leftParticipantFbId } = event.logMessageData;
			if (leftParticipantFbId == api.getCurrentUserID()) return;

			const hours = getTime("HH");
			const threadName = threadData.threadName;
			const userName = await usersData.getName(leftParticipantFbId);

			let { leaveMessage = getLang("defaultLeaveMessage") } = threadData.data;
			leaveMessage = leaveMessage
				.replace(/\{userName\}/g, userName)
				.replace(/\{type\}/g, leftParticipantFbId == event.author ? getLang("leaveType1") : getLang("leaveType2"))
				.replace(/\{threadName\}/g, threadName)
				.replace(/\{time\}/g, hours)
				.replace(/\{session\}/g, hours <= 10 ? getLang("session1") :
					hours <= 12 ? getLang("session2") :
						hours <= 18 ? getLang("session3") :
							getLang("session4"));

			const form = {
				body: leaveMessage,
				mentions: leaveMessage.includes("{userNameTag}") ? [{
					id: leftParticipantFbId,
					tag: userName
				}] : []
			};

			// **Folder se random video lena**
			const gifFolder = path.join(__dirname, "cache/leaveGif/randomgif");
			const files = fs.readdirSync(gifFolder).filter(file => file.endsWith(".mp4") || file.endsWith(".gif"));
			
			if (files.length > 0) {
				const randomFile = files[Math.floor(Math.random() * files.length)];
				const filePath = path.join(gifFolder, randomFile);
				form.attachment = fs.createReadStream(filePath);
			}

			message.send(form);
		}
	}
};

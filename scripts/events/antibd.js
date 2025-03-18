export default {
  config: {
    name: "antibd",
    version: "1.0.0",
    author: "𝙋𝙧𝙞𝙮𝙖𝙣𝙨𝙝 𝙍𝙖𝙟𝙥𝙪𝙩",
    description: "Stop others from changing the bot's nickname",
    category: "protection",
    guide: "No command needed, works automatically."
  },

  onEvent: async function ({ api, event, usersData, threadsData }) {
    if (event.logMessageType !== "log:user-nickname") return;

    const { logMessageData, threadID, author } = event;
    const botID = api.getCurrentUserID();
    const { BOTNAME, ADMINBOT } = globalGoat.config;
    
    const threadData = await threadsData.get(threadID);
    const botNickname = threadData.nicknames?.[botID] || BOTNAME;

    if (logMessageData.participant_id === botID && author !== botID && !ADMINBOT.includes(author) && logMessageData.nickname !== botNickname) {
        api.changeNickname(botNickname, threadID, botID);

        const userInfo = await usersData.get(author);
        return api.sendMessage(
          `${userInfo.name} - 𝙏𝙐𝙈 𝘽𝙊𝙏 𝙆𝘼 𝙉𝙄𝘾𝙆𝙉𝘼𝙈𝙀 𝘾𝙃𝘼𝙉𝙂𝙀 𝙉𝙄 𝙆𝘼𝙍 𝙎𝘼𝙆𝙏𝘼𝙔 😹🖐`, 
          threadID
        );
    }
  }
};

const { GoatWrapper } = require('fca-liane-utils');
const { loadImage, createCanvas } = require("canvas");
const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "pair",
    author: "xemon",
    role: 0,
    shortDescription: "Pair two people",
    longDescription: "Randomly pairs two users based on gender",
    category: "love",
    guide: "{pn}"
  },

  onStart: async function ({ api, event, usersData }) {
    let pathImg = __dirname + "/cache/background.png";
    let pathAvt1 = __dirname + "/cache/Avtmot.png";
    let pathAvt2 = __dirname + "/cache/Avthai.png";

    var id1 = event.senderID;
    var name1 = (await usersData.get(id1))?.name || "User 1";

    let ThreadInfo = await api.getThreadInfo(event.threadID);
    let all = ThreadInfo.userInfo;
    let gender1 = "OTHER";
    
    for (let user of all) {
      if (user.id == id1) {
        gender1 = user.gender === 1 ? "FEMALE" : user.gender === 2 ? "MALE" : "OTHER";
      }
    }

    const botID = api.getCurrentUserID();
    let candidates = [];

    if (gender1 === "FEMALE") {
      candidates = all.filter(u => u.gender === 2 && u.id !== id1 && u.id !== botID).map(u => u.id);
    } else if (gender1 === "MALE") {
      candidates = all.filter(u => u.gender === 1 && u.id !== id1 && u.id !== botID).map(u => u.id);
    } else {
      candidates = all.filter(u => u.id !== id1 && u.id !== botID).map(u => u.id);
    }

    if (candidates.length === 0) {
      return api.sendMessage("⚠️ No suitable match found!", event.threadID);
    }

    let id2 = candidates[Math.floor(Math.random() * candidates.length)];
    let name2 = (await usersData.get(id2))?.name || "User 2";

    let matchPercent = Math.floor(Math.random() * 100) + 1;
    let backgroundImages = [
      "https://i.postimg.cc/wjJ29HRB/background1.png",
      "https://i.postimg.cc/zf4Pnshv/background2.png",
      "https://i.postimg.cc/5tXRQ46D/background3.png"
    ];
    let backgroundURL = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

    let userInfo1 = await api.getUserInfo(id1);
    let userInfo2 = await api.getUserInfo(id2);
    let avatarURL1 = userInfo1[id1]?.thumbSrc || "";
    let avatarURL2 = userInfo2[id2]?.thumbSrc || "";

    let getAvtmot = (await axios.get(avatarURL1, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathAvt1, Buffer.from(getAvtmot, "utf-8"));

    let getAvthai = (await axios.get(avatarURL2, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathAvt2, Buffer.from(getAvthai, "utf-8"));

    let getBackground = (await axios.get(backgroundURL, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathImg, Buffer.from(getBackground, "utf-8"));

    let baseImage = await loadImage(pathImg);
    let baseAvt1 = await loadImage(pathAvt1);
    let baseAvt2 = await loadImage(pathAvt2);
    let canvas = createCanvas(baseImage.width, baseImage.height);
    let ctx = canvas.getContext("2d");

    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(baseAvt1, 100, 150, 300, 300);
    ctx.drawImage(baseAvt2, 900, 150, 300, 300);

    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(pathImg, imageBuffer);
    fs.removeSync(pathAvt1);
    fs.removeSync(pathAvt2);

    return api.sendMessage(
      {
        body: `💞Successful pairing!\n💌Wish you two hundred years of happiness. 🥰\nMay you both always be happy🙂\n👫 ${name1} + ${name2}\n❤️ Match Percentage: ${matchPercent}%`,
        mentions: [{ tag: name2, id: id2 }],
        attachment: fs.createReadStream(pathImg),
      },
      event.threadID,
      () => fs.unlinkSync(pathImg),
      event.messageID
    );
  },
};

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });

const { loadImage, createCanvas } = require("canvas");
const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "pair2",
    author: "xemon",
    role: 0,
    shortDescription: "Pairing system",
    longDescription: "Randomly pairs a user with another based on gender.",
    category: "love",
    guide: "{pn}"
  },

  onStart: async function ({ api, event, usersData }) {
    try {
      let pathImg = __dirname + "/tmp/background.png";
      let pathAvt1 = __dirname + "/tmp/Avtmot.png";
      let pathAvt2 = __dirname + "/tmp/Avthai.png";

      let id1 = event.senderID;
      let userData1 = await usersData.get(id1);
      let name1 = userData1 ? userData1.name : "Unknown";

      let threadInfo = await api.getThreadInfo(event.threadID);
      let allUsers = threadInfo.userInfo;
      let gender1 = allUsers.find(u => u.id == id1)?.gender || "UNKNOWN";

      let botID = api.getCurrentUserID();
      let candidates = allUsers.filter(u => u.id !== id1 && u.id !== botID);

      // Gender-based pairing
      let id2;
      if (gender1 === "FEMALE" || gender1 === 2) {
        id2 = candidates.find(u => u.gender === "MALE" || u.gender === 1)?.id;
      } else if (gender1 === "MALE" || gender1 === 1) {
        id2 = candidates.find(u => u.gender === "FEMALE" || u.gender === 2)?.id;
      }
      
      if (!id2) id2 = candidates[Math.floor(Math.random() * candidates.length)]?.id;
      if (!id2) return api.sendMessage("No suitable match found.", event.threadID);

      let userData2 = await usersData.get(id2);
      let name2 = userData2 ? userData2.name : "Unknown";

      let lovePercentage = Math.floor(Math.random() * 101);
      let backgroundURL = "https://i.imgur.com/JhUIicn.jpeg";

      // Download images
      const downloadImage = async (url, path) => {
        let imgData = (await axios.get(url, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(path, imgData);
      };

      await downloadImage(`https://graph.facebook.com/${id1}/picture?width=720&height=720`, pathAvt1);
      await downloadImage(`https://graph.facebook.com/${id2}/picture?width=720&height=720`, pathAvt2);
      await downloadImage(backgroundURL, pathImg);

      // Create final image
      let baseImage = await loadImage(pathImg);
      let baseAvt1 = await loadImage(pathAvt1);
      let baseAvt2 = await loadImage(pathAvt2);

      let canvas = createCanvas(baseImage.width, baseImage.height);
      let ctx = canvas.getContext("2d");

      ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(baseAvt1, 80, 90, 265, 280);
      ctx.drawImage(baseAvt2, 690, 90, 265, 280);

      let imageBuffer = canvas.toBuffer();
      fs.writeFileSync(pathImg, imageBuffer);

      fs.removeSync(pathAvt1);
      fs.removeSync(pathAvt2);

      return api.sendMessage(
        {
          body: `💞Successful pairing!\n💌Wish you two hundred years of happiness.\nMay you both always be happy🙂\n👫 ${name1} + ${name2}\n❤️ Love Percentage: ${lovePercentage}%`,
          mentions: [{ tag: name2, id: id2 }],
          attachment: fs.createReadStream(pathImg),
        },
        event.threadID,
        () => fs.unlinkSync(pathImg),
        event.messageID
      );
    } catch (error) {
      console.error(error);
      return api.sendMessage("An error occurred while pairing.", event.threadID);
    }
  }
};

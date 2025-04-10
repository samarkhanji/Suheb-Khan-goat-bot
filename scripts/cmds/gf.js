const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const jimp = require("jimp");

module.exports = {
  config: {
    name: "gf",
    aliases: [],
    version: "1.0",
    author: "Raj",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "Pair with mentioned girl"
    },
    longDescription: {
      vi: "",
      en: "Generate pairing photo with mentioned user"
    },
    category: "image",
    guide: {
      en: "{pn} @mention"
    }
  },

  onStart: async function ({ event, message, usersData, api }) {
    const mention = Object.keys(event.mentions);
    if (!mention[0]) {
      return message.reply("कृपया किसी एक को टैग करें जिससे pairing करना चाहते हो!");
    }

    const senderID = event.senderID;
    const receiverID = mention[0];

    const canvasPath = path.join(__dirname, "cache", "canvas");
    const bgPath = path.join(canvasPath, "arr2.png");
    const imgPath = path.join(canvasPath, `pair_${senderID}_${receiverID}.png`);
    const avt1 = path.join(canvasPath, `avt1_${senderID}.png`);
    const avt2 = path.join(canvasPath, `avt2_${receiverID}.png`);

    try {
      // Create canvas folder if not exist
      if (!fs.existsSync(canvasPath)) fs.mkdirSync(canvasPath, { recursive: true });

      // Download background if not exist
      if (!fs.existsSync(bgPath)) {
        const bgImg = (await axios.get("https://i.imgur.com/iaOiAXe.jpeg", { responseType: "arraybuffer" })).data;
        fs.writeFileSync(bgPath, bgImg);
      }

      // Download avatars
      const avatar1 = (
        await axios.get(`https://graph.facebook.com/${senderID}/picture?width=512&height=512&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`, {
          responseType: "arraybuffer",
        })
      ).data;
      fs.writeFileSync(avt1, avatar1);

      const avatar2 = (
        await axios.get(`https://graph.facebook.com/${receiverID}/picture?width=512&height=512&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`, {
          responseType: "arraybuffer",
        })
      ).data;
      fs.writeFileSync(avt2, avatar2);

      // Process images
      const bg = await jimp.read(bgPath);
      const circ1 = await jimp.read(await circleImage(avt1));
      const circ2 = await jimp.read(await circleImage(avt2));

      bg
        .composite(circ1.resize(200, 200), 70, 110)
        .composite(circ2.resize(200, 200), 465, 110);

      const finalBuffer = await bg.getBufferAsync("image/png");
      fs.writeFileSync(imgPath, finalBuffer);

      // Cleanup avatars
      fs.unlinkSync(avt1);
      fs.unlinkSync(avt2);

      // Send final result
      return message.reply({
        body: `╔═══❖••° °••❖═══╗\n\n   𝐒𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥 𝐏𝐚𝐢𝐫𝐢𝐧𝐠\n\n╚═══❖••° °••❖═══╝\n\n   ✶⊶⊷⊷❍⊶⊷⊷✶\n\n       👑 𝐌𝐢𝐥𝐥 𝐆𝐚𝐲𝐢 ❤\n\n𝐓𝐞𝐫𝐢 𝐆𝐢𝐫𝐥𝐟𝐫𝐢𝐞𝐧𝐝 🩷\n\n   ✶⊶⊷⊷❍⊶⊷⊷✶`,
        attachment: fs.createReadStream(imgPath)
      }, () => fs.unlinkSync(imgPath));

    } catch (err) {
      console.log(err);
      return message.reply("❌ | कुछ गड़बड़ हो गई pairing बनाते वक़्त!");
    }
  }
};

async function circleImage(imgPath) {
  const img = await jimp.read(imgPath);
  img.circle();
  return await img.getBufferAsync("image/png");
                                                      }

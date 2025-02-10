const fs = require("fs-extra");

module.exports = {
config: {
    name: "goibot",
    version: "1.0",
    author: "Samir",
    countDown: 5,
    role: 0,
    shortDescription: "no-prefix",
    longDescription: "Bot Will Reply You In Engish/Bangla Language",
    category: "no prefix",
    guide: {
      en: "{p}{n}",
    }
  },

 onStart: async function ({  }) { },
  onChat: async function ({ api, event, args, Threads, userData }) {

  var { threadID, messageID, senderID } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Kolkata").format("HH:MM:ss L");
  var idgr = `${event.threadID}`;
  var id = event.senderID;

  var Messages = ["Haaye Main Sadke jawa Teri Masoom Shakal pe😘🙈 " , "Bot Na Bol Oye Janu bol Mujhe🙆‍♂️🙈🦋🤍🍒🕊️🥀💗 " , "Han bol naa 🤬🤬🤬" , "Main Gareebon Se Bt Nhi kRta 😉😝😋🤪" , "Itna Na Pass aa Pyar h0 JayGa😝😋🤪" , "Bolo Babu Tum Mujhse Pyar Karte Ho Na 🙈 " , "Are jaan Majaak ke mood me nhi hu main jo kaam hai bol do sharmao nahi🎸🎭━━•☆°•°•💗" , "Tum wahi ho na 🤔jo bazar me chappal se pit rahe the🥱🥳" , "फ़िल्टर में रहने दो….🤔फ़िल्टर ना हटाओ, 🙂फ़िल्टर जो हट गया तो…बाबू डर जाएगा।😝😝🙈" , "Kyaa ho gyaa chhpri 🙂🙏" , "Are Band kar Brna amabani se bolke tera net bnd kra dunga" , "अब से रोज़ नहाने के लिए टॉस करूँगा, हेड आया तो नहाऊंगा, टेल आया तो फिर से टॉस करूँगा..!!🙈🤣🤣🤣" , "Tumko koi aur Kam nhi ha? Pura din Khate ho Aur Messenger pe Bot Bot Karte ho" , " Babu is diwali pe apne patake pe dhyan dena dusre ke patake ko mt dekhna 👉🙂🤣🙊" , "Abhi Bola Toh Bola Dubara Mat Bolna" , "Bol De koi nahi dekh rha 🙄☢━💛🌹💛" , "Haaye Main Mar Jawa Babu Ek Chuma To Do Kafi Din Se Chumi Nahi Di 😝🦋🤍🍒🕊️🥀💗" , "Dur Hat Be Mujhe Aur Koi Kam Nahi Kya Har Waqt Mujhe Tang Kerte Rhte ho 😂" , "Are Bolo Meri Jaan Kya Hall Hai😚 " , "Chup Reh Nhi To Bahar Ake tera Dat Tod Dunga♡• || •___'[💔]~~🖤 " , "कुछ लोगों को मोहब्बत का ऐसा नशा चढ़ता है …की शायरी वो लिखते हैं दर्द पूरा फेसबुक सहन करता है।🙄🤦‍♂️", "teri yaad na aaye aisa roj hota hai😝🙈🙈🙈 " , "ससुराल जाने का सपना तो मेरा भी था पर setting धोका दे गयी 🙊🤣" , "हे भगवान् मुझे बेशक सिंगल रखना लेकिन सेटिंग उसकी भी मत होने देना …जिस से मेरी शादी होगी।🙆‍♂️🙆‍♂️🙈🤣 " , "sab logo ko bta du... Aaj patakhe jitne fodne hai fod Lo! pr patake usko chhodna mt 🙈🙈🙈😝°•°•💗"];

    var rand = Messages[Math.floor(Math.random() * Messages.length)]

        if ((event.body.toLowerCase() == "love you bot") || (event.body.toLowerCase() == "love bot")) {
         return api.sendMessage("Hmm..Love you too baby 💋🙂:))", threadID);
       };

        if ((event.body.toLowerCase() == "good morning") || (event.body.toLowerCase() == "gm")) {
         return api.sendMessage("Hi, good morning have a nice day ❤️🙏", threadID);
       };

       if ((event.body.toLowerCase() == "happy diwali all") || (event.body.toLowerCase() == "Happy diwali")) {
         return api.sendMessage("I wish you and your family a very happy Diwali. 🥰🎉💥", threadID);
       };

       if ((event.body.toLowerCase() == "bsdk") || (event.body.toLowerCase() == "mc")) {
         return api.sendMessage("Oye gaali mat de 🤬🤬", threadID);
       };

       if ((event.body.toLowerCase() == "owner") || (event.body.toLowerCase() == "Admin kon hai")) {
         return api.sendMessage("[𝐎𝐖𝐍𝐄𝐑:☞➸⃝🐼⃝⃞⃟💙🆁🄰🄹 \n. 𝐇𝐢𝐬 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐢𝐝 :- https://www.facebook.com/profile.php?id=100085303477541", threadID);
       };

      if ((event.body.toLowerCase() == "new movie") || (event.body.toLowerCase() == "latest movie")) {
         return api.sendMessage("ARTICLE 370 \n https://srv5.pkpics.lol/download/0oTM5QDM4cDOwcTM:,,QORpFM0ZUQFp3N" , threadID);
       };

       if ((event.body.toLowerCase() == "by") || (event.body.toLowerCase() == "bye")) {
         return api.sendMessage("Okay baby,apna khyal rakhna❤", threadID);
       };

       if ((event.body.toLowerCase() == "anyone") || (event.body.toLowerCase() == "any")) {
         return api.sendMessage("Hello dear,I m here ❤", threadID);
       };

       if ((event.body.toLowerCase() == "🙂") || (event.body.toLowerCase() == "🥺")) {
         return api.sendMessage("What happen dear 🙏🙂", threadID);
       };

       if ((event.body.toLowerCase() == "chup") || (event.body.toLowerCase() == "Chup kar")) {
         return api.sendMessage("Ek thppad me nali me fek dunga🙏🙂", threadID);
       };

       if ((event.body.toLowerCase() == "malik se BAKCHODI") || (event.body.toLowerCase() == "baap se bkwas")) {
         return api.sendMessage("Sorry malik maaf kr do glti ho gyi🥺🙏", threadID);
       };

       if ((event.body.toLowerCase() == "❤️") || (event.body.toLowerCase() == "🥰")) {
         return api.sendMessage("😘🙊", threadID);
       };

       if ((event.body.toLowerCase() == "👍") || (event.body.toLowerCase() == "thenga")) {
         return api.sendMessage("Oye thenga mat dikha 🙂🙏", threadID);
       };

       if ((event.body.toLowerCase() == "good night") || (event.body.toLowerCase() == "gn")

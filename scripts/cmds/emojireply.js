module.exports = {
  config: {
    name: "emojiReply",
    version: "2.0",
    author: "Your Name",
    description: "Super funny emoji-based auto-reply",
    category: "no prefix",
    cooldown: 3
  },

  onStart: async function () {
    // Empty function taaki bot install ho sake
  },

  onChat: async function ({ api, event }) {
    const { threadID } = event;

    // 🔥 MAZEDAAR EMOJI REPLIES 🔥
    const emojiReplies = {
      "😂": [
        "Hasi rok nahi pa raha! 🤣🤣",
        "Ek aur joke maar do Babu! 😁",
        "Babu comedy show shuru ho gaya kya? 😂",
        "Joke sunke pet dukh raha hai! 🤪"
      ],
      "😡": [
        "Arre babu, gussa thanda kar warna volcano phat jayega! 🌋🔥",
        "Itna gussa? Koi Maggie chura ke kha gaya kya? 🍜😂",
        "Shant ho ja babu, nahi to Hulk ban jayega! 💪😡",
        "Lagta hai kisi ne tera net slow kar diya! 📶🐢",
        "Ek deep breath le, warna mobile tod dega! 📱💥"
      ],
      "🥶": [
       "Arre babu, tu insaan hai ya deep freezer? 🥶❄️",
        "Itni thand? Snowman bhi sharma gaya! ⛄😂",
        "Lagta hai Siberia se direct aaya hai! ❄️🌍",
        "AC kam kar warna ice cube ban jayega! 🧊🥶",
        "Thand se hil raha hai ya DJ pe nach raha hai? 🕺😂"
      ],
      "😹": [
        "Billi bhi hasi se gutargun kar rahi hai! 😹🐱",
        "Meow meow! Billi bhi memes dekhne lagi hai! 🐈😂",
        "Hasi ki tsunami! Billi bhi pagal ho gayi! 😹🌊",
        "Lagta hai billi ko bhi stand-up comedy pasand hai! 🎤😂",
        "Billi ka bhi hasna valid hai, memes dekh rahi hai! 😹📱"
      ],
      "👻": [
        "Arre babu, bhoot aya kya? Ya sirf net slow hai? 👻😂",
        "Kahin tu invisible mode pe to nahi? 🫣👻",
        "Bhootni ke! Itna horror mat bana, comedy kar! 😂",
        "Lagta hai kisi horror movie ka effect hai! 🎥👻",
        "Mujhe mat darana babu, mai already fearless hoon! 😎👻"
      ],
      "😎": [
        "Babu full style me hai! 😎🔥",
        "Attitude level: 100% 😏",
        "Yeh banda swag me rehta hai! 🤩",
        "Style maarna bandh kar! 😂"
      ],
      "❤️": [
        "Dil se dil tak! ❤️🔥",
        "Pyaar mohabbat zindabad! 💘",
        "Mujhe bhi pyaar karo yaar! 🥺",
        "Bas kar, ab to shaadi bhi karlo! 💍😂"
      ],
      "👍": [
        "Babu ne approve de diya! 👍🔥",
        "Sahi hai Babu! 👌",
        "Keep rocking! 🤟🔥",
        "Aaj kuch to bada hone wala hai! 😏"
      ],
      "🤐": [
        "Arre babu, itni shanti kyu? Tape lag gaya kya? 🤐😂",
        "Lagta hai kisi ne 'mute' button daba diya! 🔇🤐",
        "Secret agent mode on? 🤫😂",
        "Kya baat hai babu, sach bol diya kya? 😆🤐",
        "Aise chup mat reh, warna log sochenge plan bana raha hai! 🤨🤐"
      ],
      "🔥": [
        "Aag laga di Babu! 🔥🔥",
        "Babu pura danger zone me hai! 😎🔥",
        "Lagta hai gas cylinder phat gaya! 💣🔥",
        "Arre, fire brigade bulaun kya? 🚒"
      ],
      "🥺": [
        "Awww, kya hua babu? 🥺",
        "Rona mat, warna mai bhi ro dunga! 😭",
        "Ek chocolate lele 🍫",
        "Tujhse kaun naraz ho gaya? 😢"
      ],
      "🤔": [
        "Dimag ka dahi ho gaya! 🧠",
        "Sochne wali baat hai... 🤔",
        "Ek kaam kar, chai pee le! ☕",
        "Babu full detective mode me hai! 🕵️‍♂️"
      ],
      "🤬": [
        "Gussa shant rakho! 😠",
        "Kisko marne ka plan hai? 🤨",
        "Aree Babu chill! 😎",
        "Itni garmi kyu hai Babu? 🔥🥵"
      ],
      "🤡": [
        "Koi circus bula lo! 🤡",
        "Pagal hai kya Babu? 🤣",
        "Yeh banda full joker hai! 🎭",
        "Comedy show kab start ho raha hai? 😂"
      ],
      "💀": [
        "Arre Babu RIP! 💀",
        "Lagta hai kisi ka dil tut gaya! 💔",
        "Duniya gol hai, sabko maar dal! 🔪",
        "Kaun mar gaya Babu? 😂"
      ],
      "🙄": [
        "Babu full ignore mode me hai! 😂",
        "Zyada nakhre mat dikha! 🤨",
        "Aankh ghumayi, game over! 🎮",
        "Babu attitude me hai! 😏"
      ],
      "🤣": [
        "Bas kar pagle, hasi nahi ruk rahi! 🤣",
        "Mast joke tha! 😂",
        "Babu pet dukh raha hai! 🤪",
        "Haste raho! 😆"
      ],
      "😇": [
        "Babu full shanti mode me hai! 😇",
        "Swarg me booking kara di kya? 😂",
        "Itni sharafat! Kuch to gadbad hai! 🤨",
        "Babu full bhagwan wala mood me hai! 😇"
      ],
      "😏": [
        "Chhupa Rustam! 😏",
        "Babu kuch bada plan kar raha hai! 🤨",
        "Kis ladki ko impress kar raha hai? 😉",
        "Is look me kuch to garbar hai! 🤔"
      ],
      "😭": [
        "Kisne rulaya tujhe? 🥺",
        "Bas kar, warna mai bhi ro dunga! 😭",
        "Babu full sad mode me chala gaya! 😢",
        "Agar ye breakup ka rona hai, to block maar! 🚫"
      ],
      "😴": [
        "Babu full neend mode me hai! 😴",
        "Abe uth ja, subah ho gayi! ☀️",
        "Dreamland me enjoy kar raha hai babu! 🌙",
        "Babu kitna soyega? Alarm bajwa du kya? ⏰"
      ],
      "🤢": [
        "Arre Babu ulti ho gayi kya? 🤢",
        "Itna ganda dekh liya kya? 😵",
        "Babu ko food poisoning ho gayi lagta hai! 🤮",
        "Abey doctor bulaun kya? 🚑"
      ],
      "👻": [
        "Bhoot aya kya? 👻",
        "Dar lag raha hai! 😨",
        "Babu horror movie dekh raha hai kya? 😱",
        "Kahin bhatakti aatma to nahi? 👀"
      ],
      "🐍": [
        "Nagini aayi re! 🐍",
        "Dost nahi, dhokebaaz hai yeh! 🐍",
        "Babu full Vishnu mode me hai! 🔱",
        "Kisne kaata tujhe? 🐍"
      ],
      "💩": [
        "Kya bakwaas hai yeh? 💩",
        "Lagta hai dimag ki dahi ho gayi! 🤯",
        "Abe ye kya gandh macha rakha hai? 😂",
        "Babu ne ultimate chutiyapa kiya! 🤦‍♂️"
      ],
      "🎉": [
        "Party time! 🎉🥳",
        "Kis baat ki party hai Babu? 🎊",
        "Aaj kuch special hai kya? 🍾",
        "Babu full celebration mode me hai! 🥂"
      ],
      "🥵": [
        "Babu full garam mode me hai! 🥵🔥",
        "Paani pi le babu! 💧",
        "AC chala de warna pighal jayega! ❄️",
        "Itni garmi? Aag laga di kya? 🔥"
      ]
    };

    // User ka message
    const userMessage = event.body ? event.body.trim() : "";

    // Check karo ki message ek emoji hai aur list me available hai
    if (emojiReplies[userMessage]) {
      const replies = emojiReplies[userMessage];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      return api.sendMessage(randomReply, threadID);
    }
  }
};

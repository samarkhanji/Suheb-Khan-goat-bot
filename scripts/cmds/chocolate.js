module.exports = {
 config: {
	 name: "CHOCOLATE",
	 version: "1.0",
	 author: "AceGun",
	 countDown: 5,
	 role: 0,
	 shortDescription: "no prefix",
	 longDescription: "no prefix",
	 category: "no prefix",
 },

 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "chocolate") {
 return message.reply({
 body: "Ye Baby Aapke Liye Chocolate Kha Lo 😋😋",
 attachment: await global.utils.getStreamFromURL("https://i.imgur.com/qxusJJr.jpeg")
 });
 }
 }
}

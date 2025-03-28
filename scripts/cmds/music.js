const axios = require("axios");
const yts = require("yt-search");

module.exports = {
  config: {
    name: "music",
    aliases: ["audio", "song"],
    version: "1.1",
    author: "Nobita",
    countDown: 5,
    role: 0,
    shortDescription: "Download audio from YouTube",
    longDescription: "Searches YouTube and downloads audio in MP3 format.",
    category: "media",
    guide: "{pn} <song name or YouTube URL>"
  },

  onStart: async function ({ message, args }) {
    try {
      if (!args.length) return message.reply("❌ Please provide a song name or YouTube link.");

      let videoUrl = args.join(" ");
      let videoTitle = "Unknown Title";

      // Agar input me YouTube link nahi hai to search karo
      if (!videoUrl.includes("youtube.com") && !videoUrl.includes("youtu.be")) {
        message.reply("🔎 Searching for the song...");
        const searchResults = await yts(videoUrl);
        if (!searchResults.videos.length) return message.reply("⚠️ No results found.");
        
        videoUrl = searchResults.videos[0].url;
        videoTitle = searchResults.videos[0].title;
      }

      // Tumhari API se MP3 download link lo
      const apiUrl = `https://nobita-music-8h2y.onrender.com/download?url=${videoUrl}&type=audio`;
      const response = await axios.get(apiUrl);

      if (!response.data || !response.data.file_url) {
        return message.reply("❌ Failed to fetch the audio. Try again later.");
      }

      const audioUrl = response.data.file_url;

      await message.reply({
        body: `🎵 *Title:* ${videoTitle}\n🔗 *YouTube Link:* ${videoUrl}`,
        attachment: await global.utils.getStreamFromURL(audioUrl, `${videoTitle}.mp3`)
      });

    } catch (error) {
      console.error("Error in music command:", error);
      message.reply("⚠️ An error occurred while processing your request.");
    }
  }
};

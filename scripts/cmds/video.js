const axios = require("axios");
const yts = require("yt-search");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "video",
    aliases: ["vid", "songvid"],
    version: "1.3",
    author: "Nobita",
    countDown: 5,
    role: 0,
    shortDescription: "Download video from YouTube",
    longDescription: "Searches YouTube and downloads video in MP4 format.",
    category: "media",
    guide: "{pn} <song name or YouTube URL>"
  },

  onStart: async function ({ message, args }) {
    if (!args.length) return message.reply("❌ Please provide a video name or YouTube link.");

    let videoUrl = args.join(" ");
    let videoTitle = "Unknown Title";

    try {
      if (!videoUrl.includes("youtube.com") && !videoUrl.includes("youtu.be")) {
        message.reply("🔎 Searching for the video...");
        const searchResults = await yts(videoUrl);
        if (!searchResults.videos.length) return message.reply("⚠️ No results found.");

        videoUrl = searchResults.videos[0].url;
        videoTitle = searchResults.videos[0].title;
      }

      // Debugging log
      console.log(`✅ Fetching MP4 for: ${videoTitle} (${videoUrl})`);

      // API request
      const apiUrl = `https://nobita-music-0nwg.onrender.com/download?url=${videoUrl}&type=video`;
      const response = await axios.get(apiUrl);

      if (!response.data || !response.data.file_url) {
        console.log("❌ API response invalid:", response.data);
        return message.reply("❌ Failed to fetch the video. Try again later.");
      }

      const videoUrlFinal = response.data.file_url;
      console.log(`✅ Video file URL received: ${videoUrlFinal}`);

      await message.reply({
        body: `🎬 *Title:* ${videoTitle}\n🔗 *YouTube Link:* ${videoUrl}`,
        attachment: await global.utils.getStreamFromURL(videoUrlFinal)
      });

    } catch (error) {
      console.error("🚨 Video Command Error:", error);
      return message.reply(`⚠️ Error: ${error.message}`);
    }
  }
};

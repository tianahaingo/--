const axios = require('axios');
const fs = require('fs');

module.exports = {
  config: {
    name: "videoinfo",
    aliases: ["vi"],
    author: "ArYAN",
    version: "1.2",
    cooldowns: 5,
    role: 0,
    shortDescription: "Get YouTube video information",
    longDescription: "Retrieve detailed information about a YouTube video, including title, description, thumbnails, view count, like count, comment count, channel details, and more.",
    category: "media",
    guide: "{p}videoinfo [video title] - Fetches and displays information about the specified YouTube video.",
  },

  onStart: async function ({ api, event, args, message }) {
    try {
      if (args.length === 0) {
        return message.reply("❌ Please provide a video title.");
      }

      const videoTitle = args.join(" ");
      const response = await axios.get(`https://itsaryan.onrender.com/api/videoinfo?q=${encodeURIComponent(videoTitle)}`);

      if (!response.data || response.data.error) {
        return message.reply("❌ Sorry, no information found for that video.");
      }

      const videoDetails = response.data;

      const videoInfoText = `
        𝗧𝗶𝘁𝗹𝗲: ${videoDetails.title || "N/A"}
        𝗣𝘂𝗯𝗹𝗶𝘀𝗵𝗲𝗱 𝗔𝘁: ${new Date(videoDetails.publishedAt).toLocaleString() || "N/A"}
        𝗧𝗮𝗴𝘀: ${videoDetails.tags ? videoDetails.tags.join(', ') : "N/A"}
        𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆: ${videoDetails.category || "N/A"}
        𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻: ${videoDetails.duration || "N/A"}
        𝗩𝗶𝗲𝘄 𝗖𝗼𝘂𝗻𝘁: ${videoDetails.viewCount || "N/A"}
        𝗟𝗶𝗸𝗲 𝗖𝗼𝘂𝗻𝘁: ${videoDetails.likeCount || "N/A"}
        𝗖𝗼𝗺𝗺𝗲𝗻𝘁 𝗖𝗼𝘂𝗻𝘁: ${videoDetails.commentCount || "N/A"}
        Channel Title: ${videoDetails.channel.title || "N/A"}
        𝗖𝗵𝗮𝗻𝗻𝗲𝗹 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${videoDetails.channel.description || "N/A"}
        𝗦𝘂𝗯𝘀𝗰𝗿𝗶𝗯𝗲𝗿 𝗖𝗼𝘂𝗻𝘁: ${videoDetails.channel.subscriberCount || "N/A"}
        𝗖𝗵𝗮𝗻𝗻𝗲𝗹 𝗨𝗥𝗟: https://www.youtube.com/channel/${videoDetails.channel.id}
        `;

      const sendImage = async (url, path, callback) => {
        const writer = fs.createWriteStream(path);
        const imageResponse = await axios({
          url: url,
          method: 'GET',
          responseType: 'stream'
        });
        imageResponse.data.pipe(writer);
        writer.on('finish', callback);
        writer.on('error', (error) => {
          console.error(error);
          message.reply("❌ Sorry, an error occurred while processing an image.");
        });
      };

      const thumbnailUrl = videoDetails.thumbnails.high.url;
      const thumbnailPath = `/tmp/${videoDetails.title.replace(/ /g, "_")}_thumbnail.jpg`;

      const sendMessageWithAttachments = () => {
        const attachments = [];
        if (fs.existsSync(thumbnailPath)) attachments.push(fs.createReadStream(thumbnailPath));

        message.reply({
          body: videoInfoText.trim(),
          attachment: attachments
        });
        api.setMessageReaction("✅", event.messageID, (err) => {}, true);
      };

      if (thumbnailUrl) {
        await sendImage(thumbnailUrl, thumbnailPath, sendMessageWithAttachments);
      } else {
        await message.reply({ body: videoInfoText.trim() });
        api.setMessageReaction("✅", event.messageID, (err) => {}, true);
      }

    } catch (error) {
      console.error(error);
      message.reply("❌ Sorry, an error occurred while processing your request.");
    }
  }
};

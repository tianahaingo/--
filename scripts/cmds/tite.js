const axios = require("axios");
const fs = require("fs");

module.exports = {
  config: {
    name: "tite",
    version: "1",
    hasPermission: 0,
    credits: "Grey, Daniel",
    description: "Ask",
    commandCategory: "ai",
    usages: "bard <ask>",
    cooldowns: 5,
  },

  onStart: async function ({ api, event }) {
    const { threadID, messageID, body } = event;
    const cookies = "g.a000jQgNhKys7Jhr15fONjrAVapDgtzWR4u_LV_jF9BsIHc3FEbalkyNQgqyyTjrEX3Ki9rn7wACgYKAWUSAQASFQHGX2Mieo9qxM_VwsruNHGgBM4YMxoVAUF8yKqQoe_ctjoR2wkOTpnkhnlL0076";
    const response = body.slice(5).trim();

    if (!response) {
      api.sendMessage("Please provide a question or query", threadID, messageID);
      return;
    }

    api.sendMessage("Searching for an answer, please wait...", threadID, messageID);

    try {
      const res = await axios.get(`https://gptgotest.lazygreyzz.repl.co/ask?cookies=${cookies}&question=${response}`);
      const { response: responseData, image: imageUrls } = res.data;

      if (responseData && responseData.length > 0) {
        const photoUrls = imageUrls.map(url => url.replace(/\\(.)/mg, "$1"));
        const photoAttachments = [];

        if (!fs.existsSync("cache")) {
          fs.mkdirSync("cache");
        }

        for (let i = 0; i < photoUrls.length; i++) {
          const url = photoUrls[i];
          const photoPath = `cache/photo_${i + 1}.png`;

          try {
            const imageResponse = await axios.get(url, { responseType: "arraybuffer" });
            fs.writeFileSync(photoPath, imageResponse.data);
            photoAttachments.push(fs.createReadStream(photoPath));
          } catch (error) {
            console.error("Error occurred while downloading and saving the photo:", error);
          }
        }

        api.sendMessage({
          attachment: photoAttachments,
          body: responseData,
        }, threadID, messageID);
      } else {
        api.sendMessage(responseData, threadID, messageID);
      }
    } catch (error) {
      console.error("Error occurred while fetching data from the Bard API:", error);
      api.sendMessage("An error occurred while processing your request.", threadID, messageID);
    }
  },
};

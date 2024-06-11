const axios = require('axios');

module.exports = {
  config: {
    name: "screenshot",
    author: "AkhiroDEV | @Vex Kshitiz",
    hasPrefix: false,
    description: "Capture a screenshot from a provided URL",
    usage: "screenshot [url]",
    commandCategory: "utility"
  },
  onStart: async function({ api, event, args }) {
    const url = args[0];
    if (!url) {
      return api.sendMessage("Please provide a URL to capture the screenshot from.", event.threadID, event.messageID);
    }
    try {
      const response = await axios.get(`https://api.popcat.xyz/screenshot?url=${encodeURIComponent(url)}`);
      if (response.data && response.data.url) {
        const screenshotUrl = response.data.url;
        api.sendMessage({ attachment: screenshotUrl }, event.threadID, event.messageID);
      } else {
        api.sendMessage("Failed to capture the screenshot. Please check the provided URL and try again.", event.threadID, event.messageID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage(`An error occurred while capturing the screenshot: ${error.message}`, event.threadID);
    }
  }
};

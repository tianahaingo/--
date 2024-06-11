const axios = require('axios');

module.exports = {
  config: {
    name: "fbstate",
    author: "Your Name",
    hasPrefix: true,
    description: "Check the login state of a Facebook account",
    usage: "fbstate [username] [password]"
  },
  onStart: async function({ api, event, args }) {
    const username = args[0];
    const password = args[1];
    if (!username || !password) {
      return api.sendMessage("Please provide both the username and password of the Facebook account.", event.threadID, event.messageID);
    }
    try {
      const response = await axios.get(`https://69070.replit.app/getappstate?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
      const loginState = response.data;
      if (loginState === "connected") {
        api.sendMessage("The Facebook account is currently logged in.", event.threadID, event.messageID);
      } else if (loginState === "disconnected") {
        api.sendMessage("The Facebook account is currently logged out.", event.threadID, event.messageID);
      } else {
        api.sendMessage("Unable to determine the login state of the Facebook account.", event.threadID, event.messageID);
      }
    } catch (error) {
      console.log(error);
      api.sendMessage(`Error: ${error.message}`, event.threadID);
    }
  }
};

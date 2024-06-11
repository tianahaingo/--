const axios = require('axios');

module.exports = {
  config: {
    name: "neuronspike",
    author: "cliff",//api by hazey
    version: "1.0.0",
    countDown: 5,
    role: 0,
    category: "Ai",
    shortDescription: {
      en: "{p}neuronspike"
    }
  },
  onStart: async function ({ api, event, args }) {
    try {
      if (!args[0]) {
        return api.sendMessage("Please provide a prompt for Snoflake.", event.threadID);
      }

      const prompt = encodeURIComponent(args.join(" "));
      const apiUrl = `https://ai-1stclass-nemory-project.vercel.app/api/neuronspike?ask=${prompt}`;

      const response = await axios.get(apiUrl);

      if (response.data && response.data.response) {
        api.sendMessage(response.data.response, event.threadID);
      } else {
        api.sendMessage("Unable to get a response from Snoflake.", event.threadID);
      }
    } catch (error) {
      console.error('Error making Snoflake API request:', error.message);
      api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
  }
};


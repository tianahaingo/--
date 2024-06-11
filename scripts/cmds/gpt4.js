const axios = require('axios');

module.exports = {
  config: {
    name: "gpt4",
    version: "1.0",
    hasPermission: 0,
    credits: "RICKCIEL",
    usePrefix: true,
    description: "ASK THE AI",
    commandCategory: "General",
    cooldowns: 2,
  },

  onStart: async ({ api, event, args }) => {
    try {
      const question = args.join(' ');

      if (!question) {
        return api.sendMessage("Please provide any question.", event.threadID);
      }

      const API_SERVER_URL = 'https://hashier-api-groq.vercel.app/api/groq/mistral';
      const response = await axios.get(`${API_SERVER_URL}?ask=${encodeURIComponent(question)}`);

      if (response.data.error) {
        return api.sendMessage("Oops! The AI encountered an error. Please try again later.", event.threadID);
      }

      const answer = response.data.answer;

      if (answer) {
        api.sendMessage(`AI said: ${answer}`, event.threadID);
      } else {
        api.sendMessage("There's something wrong. Please try again...", event.threadID);
      }
    } catch (error) {
      console.error('Error fetching response:', error);
      api.sendMessage("Error fetching response.", event.threadID);
    }
  },
};

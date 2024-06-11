const axios = require('axios');

module.exports = {
  config: {
    name: "zoro",
    author: "AkhiroDEV | @Vex Kshitiz",
    hasPrefix: false,
    description: "Talk with MakimaAI",
    usage: "zoro [query]"
  },
  onStart: async function({ api, event, args }) {
    const behavior = "your name is Roronoa Zoro or Zoro AI from anime one piece that was been always got lost";
    const prompt = args.join(" ");
    if (!prompt) {
      return api.sendMessage("Hey... What's your question?", event.threadID, event.messageID);
    }
    try {
      const response = await axios.get(`https://personal-ai-phi.vercel.app/kshitiz?prompt=${encodeURIComponent(prompt)}&content=${encodeURIComponent(behavior)}`);
      const answer = response.data.answer;
      api.sendMessage(answer, event.threadID, event.messageID);
    } catch (error) {
      console.log(error);
      api.sendMessage(`Bro the API got lost, I'll be back after years: ${error.message}`, event.threadID);
    }
  }
};

const axios = require('axios');
const moment = require('moment-timezone');

module.exports = {
  config: {
    name: 'ai',
    version: '1.0.0',
    role: 0,
    hasPrefix: false,
    aliases: ['snow', 'ai'],
    description: "An AI command powered by Snowflakes AI",
    usage: "snowflakes [prompt]",
    credits: 'churchill, modified by joshua apostol',
    cooldown: 3,
  },

  onStart: async function ({ api, event, args }) {
    const input = args.join(' ');
    const timeString = moment.tz('Asia/Manila').format('LLL');

    if (!input) {
      api.sendMessage(`⚠️ Please provide a question/query.`, event.threadID, event.messageID);
      return;
    }

    api.sendMessage(`🔍 Searching for Snowflakes AI response....`, event.threadID, event.messageID);

    try {
      const { data } = await axios.get(`https://hashier-api-snowflake.vercel.app/api/snowflake?ask=${encodeURIComponent(input)}`);
      if (data.response) {
        api.sendMessage(`❄️ Snowflakes AI Response:\n━━━━━━━━━━━━\n\n${data.response}\n\n${timeString}\n\n🔗 Link: https://www.facebook.com/bruno.rakotomalala.7549`, event.threadID, event.messageID);
      } else {
        api.sendMessage('❌ No response found.', event.threadID, event.messageID);
      }
    } catch (error) {
      api.sendMessage('⚠️ An error occurred while processing your request.', event.threadID, event.messageID);
    }
  },
};


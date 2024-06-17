async function getUserName(api, userID) {
  try {
    const userInfo = await api.getUserInfo(userID);
    return userInfo[userID]?.name || "User";
  } catch (error) {
    console.log(error);
    return "User";
  }
}

module.exports = {
  config: {
    name: "block",
    version: "1.0",
    role: 2,
    hasPermision: 0,
    credits: "cliff",
    description: "Block a user",
    hasPrefix: false,
    usePrefix: false,
    commandCategory: "Admin",
    usages: "{p}{n} @mention, reply, senderID",
    aliases: ["block", "ban"],
    usage: "{p}{n} @mention, reply, senderID",
    cooldown: 0,
    cooldowns: 5,
  },

  onStart: async function ({ api, event, args }) {
    const { mentions, messageReply, threadID, senderID, messageID } = event;
    const mentionID = Object.keys(mentions)[0];

    if (!mentionID && !messageReply) {
      return api.sendMessage(`Please mention the user you want to block.`, threadID, messageID);
    }

    const targetID = mentionID || messageReply.senderID;

    if (targetID) {
      const userName = await getUserName(api, targetID);
      await api.sendMessage("🛡️ | You have been blocked.", targetID);
      await api.sendMessage(`🚫 | ${userName} has been blocked successfully.`, threadID, messageID);
      await api.changeBlockedStatus(targetID, true);
    }
  }
};

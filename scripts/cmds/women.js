const fs = require("fs");

module.exports = {
    config: {
        name: "Women",
        version: "1.0.2",
        hasPermssion: 0,
        credits: "Joshua",
        description: "no prefix",
        usePrefix: false,
        commandCategory: "No command marks needed",
        usages: "Women",
        cooldowns: 5,
    },
    onStart: function ({ api, event, client, __GLOBAL }) {
        var { threadID, messageID } = event;
        if (
            event.body.indexOf("women") == 0 ||
            event.body.indexOf("Women") == 0 ||
            event.body.indexOf("Babae") == 0 ||
            event.body.indexOf("babae") == 0
        ) {
            var msg = {
                body: "pogi kung owner Joshua😎",
                attachment: fs.createReadStream(
                    __dirname + `/noprefix/Women.mp4`
                ),
            };
            api.sendMessage(msg, threadID, (err, messageInfo) => {
                if (!err) {
                    api.setMessageReaction("☕", messageInfo.messageID, () => {}, true);
                } else {
                    console.error(err);
                }
            });
        }
    },
};

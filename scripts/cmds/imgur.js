module.exports = {
    config: {
        name: "imgur",
        version: "2.1.0",
        hasPermssion: 0,
        credits: "KENLIEPLAYS",
        description: "imgur upload",
        commandCategory: "imgur",
        usages: "[reply to image]",
        cooldowns: 5,
        dependencies: {
            "axios": ""
        }
    },

    onStart: async ({ api, event }) => {
        const axios = global.nodemodule['axios'];  
        const attachment = event.messageReply ? event.messageReply.attachments[0] : null;
        
        if (!attachment) {
            return api.sendMessage('Please reply to an image.', event.threadID, event.messageID);
        }

        const imageUrl = attachment.url;
        
        try {
            const res = await axios.get(`https://api.kenliejugarap.com/imgur/?imageLink=${encodeURIComponent(imageUrl)}`);
            if (res.data.error) {
                return api.sendMessage(res.data.error, event.threadID, event.messageID);
            }
            const imgurLink = res.data.link;
            return api.sendMessage(`Here is your imgur link:\n${imgurLink}`, event.threadID, event.messageID);
        } catch (error) {
            return api.sendMessage('An error occurred while uploading the image.', event.threadID, event.messageID);
        }
    }
};

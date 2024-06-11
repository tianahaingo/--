module.exports = {
    config: {
        name: "antiout",
        version: "1.0.0",
        credits: "DungUwU (Khánh Milo Fix)",
        hasPermssion: 1,
        description: "Turn on/off antiout",
        usage: "antiout on/off",
        commandCategory: "system",
        cooldowns: 0
    },

    onStart: async ({ api, event, Threads }) => {
        let data = (await Threads.getData(event.threadID)).data || {};
        if (typeof data["antiout"] === "undefined" || data["antiout"] === false) {
            data["antiout"] = true;
        } else {
            data["antiout"] = false;
        }
        
        await Threads.setData(event.threadID, { data });
        global.data.threadData.set(parseInt(event.threadID), data);
        
        return api.sendMessage(`✅ Successfully ${(data["antiout"] === true) ? "turned on" : "turned off"} antiout!`, event.threadID);
    }
}

const axios = require('axios');

module.exports = {
    config: {
        name: "songlyrics",
        version: "1.0.0",
        credits: "Bruno",
        hasPermssion: 0,
        description: "Affiche les paroles d'une chanson",
        usage: "lyrics [nom_de_la_chanson]",
        commandCategory: "music",
        cooldowns: 5
    },

    onStart : async ({ api, event, args }) => {
        if (!args[0]) return api.sendMessage("Veuillez spécifier le nom de la chanson.", event.threadID);
        
        const songName = encodeURIComponent(args.join(" "));
        try {
            const response = await axios.get(`https://api.popcat.xyz/lyrics?song=${songName}`);
            const lyrics = response.data.lyrics;
            
            if (lyrics) {
                return api.sendMessage(lyrics, event.threadID);
            } else {
                return api.sendMessage("Les paroles de cette chanson ne sont pas disponibles.", event.threadID);
            }
        } catch (error) {
            return api.sendMessage("Une erreur s'est produite lors de la récupération des paroles de la chanson.", event.threadID);
        }
    }
}

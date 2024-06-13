module.exports = {
    config: {
        name: "college",
        version: "1.0.0",
        hasPermssion: 0,
        credits: "KENLIEPLAYS",
        description: "Interagir avec l'API GPT-4 Turbo",
        commandCategory: "utilitaires",
        usages: "[votre question]",
        cooldowns: 5,
        dependencies: {
            "axios": ""
        }
    },

    onStart: async ({ api, event, args }) => {
        const axios = global.nodemodule['axios'];
        const question = args.join(" ");

        if (!question) {
            return api.sendMessage('Veuillez fournir une question.', event.threadID, event.messageID);
        }

        try {
            const res = await axios.get(`https://api.kenliejugarap.com/freegpt4turbo/?question=${encodeURIComponent(question)}`);
            
            if (res.data.error) {
                return api.sendMessage(res.data.error, event.threadID, event.messageID);
            }

            const answer = res.data.answer;
            return api.sendMessage(`Réponse de GPT-4 Turbo:\n${answer}`, event.threadID, event.messageID);
        } catch (error) {
            return api.sendMessage('Une erreur est survenue lors de la demande à l\'API.', event.threadID, event.messageID);
        }
    }
};

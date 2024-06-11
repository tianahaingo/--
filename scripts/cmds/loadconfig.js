const fs = require("fs-extra");

module.exports = {
	config: {
		name: "loadconfig",
		aliases: ["loadcf"],
		version: "1.3",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		shortDescription: {
			vi: "Load láº¡i config",
			en: "Reload config"
		},
		longDescription: {
			vi: "Load láº¡i config cá»§a bot",
			en: "Reload config of bot"
		},
		category: "owner",
		guide: "{pn}"
	},

	langs: {
		vi: {
			success: "Config Ä‘Ã£ Ä‘Æ°á»£c load láº¡i thÃ nh cÃ´ng"
		},
		en: {
			success: "Config has been reloaded successfully"
		}
	},

	onStart: async function ({ message, getLang }) {
		global.GoatBot.config = fs.readJsonSync(global.client.dirConfig);
		global.GoatBot.configCommands = fs.readJsonSync(global.client.dirConfigCommands);
		message.reply(getLang("success"));
	}
};

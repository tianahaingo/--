const axios = require('axios');

module.exports = {
  config: {
    name: "element",
    author: "AkhiroDEV | @Vex Kshitiz",
    hasPrefix: false,
    description: "Retrieve information about an element from the periodic table",
    usage: "element [element_symbol]"
  },
  onStart: async function({ api, event, args }) {
    const elementSymbol = args[0];
    if (!elementSymbol) {
      return api.sendMessage("Please provide the symbol of the element you want to know about.", event.threadID, event.messageID);
    }
    try {
      const response = await axios.get(`https://api.popcat.xyz/periodic-table?element=${encodeURIComponent(elementSymbol)}`);
      const elementData = response.data;
      if (elementData && elementData.name) {
        const message = `Name: ${elementData.name}\nSymbol: ${elementData.symbol}\nAtomic number: ${elementData.atomic_number}\nAtomic mass: ${elementData.atomic_mass}\nDescription: ${elementData.description}`;
        api.sendMessage(message, event.threadID, event.messageID);
      } else {
        api.sendMessage(`Element with symbol "${elementSymbol}" not found in the periodic table.`, event.threadID, event.messageID);
      }
    } catch (error) {
      console.log(error);
      api.sendMessage(`Error: ${error.message}`, event.threadID);
    }
  }
};

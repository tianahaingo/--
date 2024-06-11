const axios = require("axios")
module.exports = {
	config: {
		name: "movie",
		version: "1.1",
		author: "Xemon",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "",
			en: "see the movie info"
		},
		longDescription: {
			vi: "",
			en: "movie info"
		},
		category: "information",
		guide: {
			vi: "{pn} movie name",
			en: "{pn} movie name"
		}
		
	},

onStart: async function ({ event, message, getLang, usersData, api, args}) {

 let query = args.join(" ")
 if(!query) return message.reply("give me movie name pre")
 try{
 let res = await axios.get(`https://api.popcat.xyz/imdb?q=${encodeURIComponent(query)}`)
 
 let title = res.data.title,
 date = res.data.year,
 time = res.data.runtime,
 genres = res.data.genres,
 director = res.data.director,
 actors = res.data.actors,
 plot = res.data.plot
 var poster = res.data.poster;
 // console.log(res)
 message.reply(
 {
 body: `â¯ Title: ${title}\â¯ Actors: ${actors}\â¯ Release Date: ${date}\â¯ Genres: ${genres}\â¯ Director: ${director}\â¯ Plot: ${plot}`,
 attachment: await global.utils.getStreamFromURL(poster)})
 } catch(e){
 console.log(e)
 message.reply("i don't see anything like your request ")
 }

 
}
 }

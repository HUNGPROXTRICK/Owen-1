const fs = require("fs");
module.exports.config = {
name: "anime",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Người Bí Ẩn",
	description: "",
	commandCategory: "Không cần dấu lệnh",
	usages: "Prefix",
	cooldowns: 5,
 dependencies: {
 "request":"",
 "fs-extra":"", 
 "axios":""
 }
};
module.exports.handleEvent = async ({ api, event, Threads }) => {
 if (event.body.indexOf("Vddoremon")==0 || 
event.body.indexOf("anime")==0 ||
event.body.indexOf("Anime")==0 ||
event.body.indexOf("Anim")==0 ||
event.body.indexOf("Anm")==0 ||
event.body.indexOf("anm")==0) {
 const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
 api.sendMessage({body:``, attachment: (await axios.get((await axios.get(`https://apirandom-2.cuongaz132006.repl.co/vdanime`)).data.url, {
 responseType: 'stream'
 })).data}, event.threadID, event.messageID);	
 }
 }
module.exports.run = async({api,event,args,Users,Threads,Currencies}) => {

 };
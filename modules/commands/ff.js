const fs = require("fs");
module.exports.config = {
name: "ff",
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
 if (event.body.indexOf("faifai")==0 || 
event.body.indexOf("ff")==0 ||
event.body.indexOf("Ff")==0 ||
event.body.indexOf("FF")==0 ||
event.body.indexOf("Lửa chùa")==0 ||
event.body.indexOf("lửa chùa")==0) {
 const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
 api.sendMessage({body:``, attachment: (await axios.get((await axios.get(`https://apirandom-2.cuongaz132006.repl.co/vdff`)).data.url, {
 responseType: 'stream'
 })).data}, event.threadID, event.messageID);	
 }
 }
module.exports.run = async({api,event,args,Users,Threads,Currencies}) => {

 };
module.exports.config = {
  name: "joinNoti",
  eventType: ['log:subscribe'],
  version: "1.0.0",
  credits: "Mirai-Team",// Mod by Q.Huy (táo)
  description: "GROUP UPDATE NOTIFICATION"
};
/*module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

  const path = join(__dirname, "cache", "joinGif");
  if (existsSync(path)) mkdirSync(path, { recursive: true });	

  const path2 = join(__dirname, "cache", "joinGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}*/
const fs = require('fs-extra');
const { loadImage, createCanvas, registerFont } = require("canvas");
const request = require('request');
const { join } = require('path');
const axios = require('axios');
const jimp = require("jimp")
const fontlink = 'https://drive.google.com/u/0/uc?id=1ZwFqYB-x6S9MjPfYm3t3SP1joohGl4iw&export=download'
module.exports.circle = async (image) => {
  image = await jimp.read(image);
  image.circle();
  return await image.getBufferAsync("image/png");
}
module.exports.run = async function({ api, event, Users }) {
  /*const { join } = global.nodemodule["path"];
  const thread = global.data.threadData.get(threadID) || {};
  if (typeof thread["joinNoti"] != "undefined" && thread["joinNoti"] == false) return;*/
  var fullYear = global.client.getTime("fullYear");
  var getHours = await global.client.getTime("hours");
  var session = `${getHours < 3 ? "đêm khuya" : getHours < 8 ? "𝑠𝑎́𝑛𝑔" : getHours < 12 ? "𝑡𝑟𝑢̛𝑎" : getHours < 17 ? "𝑐ℎ𝑖𝑒̂̀𝑢" : getHours < 23 ? "𝑡𝑜̂́𝑖" : "𝐭𝐨̂́𝐢 𝐦𝐮𝐨̣̂𝐧"}`
  const moment = require("moment-timezone");
  var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  if (thu == 'Sunday') thu = '𝐂𝐡𝐮̉ 𝐍𝐡𝐚̣̂𝐭'
  if (thu == 'Monday') thu = '𝐓𝐡𝐮̛́ 𝐇𝐚𝐢'
  if (thu == 'Tuesday') thu = '𝐓𝐡𝐮̛́ 𝐁𝐚'
  if (thu == 'Wednesday') thu = '𝐓𝐡𝐮̛́ 𝐓𝐮̛'
  if (thu == "Thursday") thu = '𝐓𝐡𝐮̛́ 𝐍𝐚̆𝐦'
  if (thu == 'Friday') thu = '𝐓𝐡𝐮̛́ 𝐒𝐚́𝐮'
  if (thu == 'Saturday') thu = '𝐓𝐡𝐮̛́ 𝐁𝐚̉𝐲'
  const ngay = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY");
  const gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
  const hours = moment.tz("Asia/Ho_Chi_Minh").format("HH");
  const { commands } = global.client;
  const { threadID } = event;
  let threadInfo = await api.getThreadInfo(event.threadID);
  let threadName = threadInfo.threadName;
  if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    api.changeNickname(`『 ${global.config.PREFIX} 』 ⪼ ${(!global.config.BOTNAME) ? "𝐁𝐎𝐓" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
    return api.sendMessage("", event.threadID, () => api.sendMessage({body:`⫸ 𝑲𝒆̂́𝒕 𝒏𝒐̂́𝒊 𝒕𝒉𝒂̀𝒏𝒉 𝒄𝒐̂𝒏𝒈 ⫷\n 𝗔𝗱𝗺𝗶𝗻 𝗕𝗼𝘁:https://www.facebook.com/100000661752086 \n━━━━━━━━━━━━━━━━━━\n𝐌𝐚𝐝𝐞 𝐁𝐲 𝐎𝐖𝐄𝐍\n${gio} - ${ngay} || ${thu} `, attachment: fs.createReadStream(__dirname + "/cache/tbvnm/hiii.gif")}, threadID));
  }
  else {
    try {
      if (!fs.existsSync(__dirname + `/cache/Semi.ttf`)) {
        let getfont = (await axios.get(fontlink, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(__dirname + `/cache/Semi.ttf`, Buffer.from(getfont, "utf-8"));
      };
      const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
      let { threadName, participantIDs } = await api.getThreadInfo(threadID);
      const threadData = global.data.threadData.get(parseInt(threadID)) || {};
      var mentions = [], nameArray = [], memLength = [], iduser = [], i = 0;
      var abx = [];
      for (id in event.logMessageData.addedParticipants) {
        const userName = event.logMessageData.addedParticipants[id].fullName; iduser.push(event.logMessageData.addedParticipants[id].userFbId.toString());
        nameArray.push(userName);
        mentions.push({ tag: userName, id: event.senderID });
        memLength.push(participantIDs.length - i++);
        console.log(userName)
      }
      // console.log(event.logMessageData.addedParticipants)
      var id = [];
      for (o = 0; o < event.logMessageData.addedParticipants.length; o++) {
        let pathImg = __dirname + `/cache/${o}.png`;
        let pathAva = __dirname + `/cache/fbcover2.png`;
        let avtAnime = (await axios.get(encodeURI(
          `https://graph.facebook.com/${event.logMessageData.addedParticipants[o].userFbId}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, {
          headers: {
            cookie: 'xs=13%3AlajUELLXiJWSGA%3A2%3A1670218018%3A-1%3A6326;c_user=100026039134645;fr=04yhWc9aZ2jCK6WYB.AWX6H8d2OYiFMQa_tmHEcMP9bNY.BjjYEe.-o.AAA.0.0.BjjYEi.AWW2404AO5I;sb=HoGNYx-MLHOu0FOMeC8kqttW;datr=HoGNY-xBBNLJjRghcnhN1hWA;'
          }
        }), { responseType: "arraybuffer" })).data;
        var ok = [
          'https://i.imgur.com/dDSh0wc.jpeg',
          'https://i.imgur.com/UucSRWJ.jpeg',
          'https://i.imgur.com/OYzHKNE.jpeg',
          'https://i.imgur.com/V5L9dPi.jpeg',
          'https://i.imgur.com/M7HEAMA.jpeg'
        ]
        let background = (await axios.get(encodeURI(`${ok[Math.floor(Math.random() * ok.length)]}`), { responseType: "arraybuffer", })).data;
        fs.writeFileSync(pathAva, Buffer.from(avtAnime, "utf-8"));
        fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
        var avatar = await this.circle(pathAva);
        let baseImage = await loadImage(pathImg);
        let baseAva = await loadImage(avatar);
        registerFont(__dirname + `/cache/Semi.ttf`, {
          family: "Semi"
        });
        let canvas = createCanvas(1902, 1082);
        console.log(canvas.width, canvas.height)
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(baseAva, canvas.width / 2 - 188, canvas.height / 2 - 375, 375, 355);
        ctx.fillStyle = "#FFF";
        ctx.textAlign = "center";
        ctx.font = `155px Semi`;
        ctx.fillText(`${event.logMessageData.addedParticipants[o].fullName}`, canvas.width / 2 + 20, canvas.height / 2 + 100);
        ctx.save();
        ctx.font = `75px Semi`;
        ctx.fillText(`Chào mừng ${threadName}`, canvas.width / 2 - 15, canvas.height / 2 + 235)
        ctx.fillText(`Thành viên thứ ${participantIDs.length - o}`, canvas.width / 2 - 15, canvas.height / 2 + 350)
        ctx.restore();
        const imageBuffer = canvas.toBuffer();
        fs.writeFileSync(pathImg, imageBuffer);
        abx.push(fs.createReadStream(__dirname + `/cache/${o}.png`))
      }
      memLength.sort((a, b) => a - b);
      (typeof threadData.customJoin == "undefined") ? msg = "🌸 === 『 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐌𝐄𝐌𝐁𝐄𝐑𝐒 』=== 🌸\n━━━━━━━━━━━━━━━━━━━━━\n[🌸]→ 𝐂𝐡𝐚̀𝐨 𝐛𝐚̣𝐧 {name}\n『 🌸 』 → 𝐂𝐡𝐚̀𝐨 𝐦𝐮̛̀𝐧𝐠 𝐛𝐚̣𝐧 𝐝𝐚̃ 𝐝𝐞̂́𝐧 𝐯𝐨̛́𝐢 𝐧𝐡𝐨́𝐦 {threadName}\n[🌐]→ 𝐔𝐫𝐥 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤:: \nfb.me/{iduser}\n[🔎]→ 𝐔𝐢𝐝 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤:: {iduser}\n[🧸]→ 𝐓𝐮̛̀ 𝐧𝐚𝐲 {type} {name} 𝐬𝐞̃ 𝐥𝐚̀ 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 𝐭𝐡𝐮̛́ {soThanhVien} 𝐜𝐮̉𝐚 𝐛𝐨𝐱 {threadName}\n━━━━━━━━━━━━━━━━━━━━━\n[❤️]→ 𝐂𝐡𝐮́𝐜 {type} 𝐜𝐨́ 𝐦𝐨̣̂𝐭 𝐛𝐮𝐨̂̉𝐢 {buoi} || {ngay} 𝐯𝐮𝐢 𝐯𝐞̉\n━━━━━━━━━━━━━━━━━━━━━\n[🥀]→ {name} 𝐝𝐮̛𝐨̛̣𝐜 𝐭𝐡𝐞̂𝐦 𝐛𝐨̛̉𝐢: {author}\n[ 👑 ]→ 𝐔𝐫𝐥 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 :\nfb.me/{uidAuthor}\n[👉]→ 𝐍𝐠𝐚̀𝐲 𝐭𝐡𝐚𝐦 𝐠𝐢𝐚: {thu} - {ngay} || {gio}" : msg = threadData.customJoin;
      var nameAuthor = await Users.getNameUser(event.author)
      msg = msg
        .replace(/\{iduser}/g, iduser.join(', '))
        .replace(/\{name}/g, nameArray.join(', '))
        .replace(/\{type}/g, (memLength.length > 1) ? 'Các bạn' : 'Bạn')
        .replace(/\{soThanhVien}/g, memLength.join(', '))
        .replace(/\{threadName}/g, threadName)
        .replace(/\{author}/g, nameAuthor)
        .replace(/\{uidAuthor}/g, event.author)
        .replace(/\{buoi}/g, session)
        .replace(/\{ngay}/g, ngay)
        .replace(/\{gio}/g, gio)
        .replace(/\{thu}/g, thu);


      var formPush = { body: msg, attachment: abx, mentions }
      api.sendMessage(formPush, threadID);
      for (let ii = 0; ii < parseInt(id.length); ii++) {
        fs.unlinkSync(__dirname + `/cache/${ii}.png`)
      }
    } catch (e) { return console.log(e) };
  }
}





const axios = require("axios");
const fs = require("fs");
module.exports.config = {
    name: "cap",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Thiệu Trung Kiên",
    description: "Chụp ảnh profile của người dùng",
    commandCategory: "Nhóm",
    usages: "",
    cooldowns: 5
}
module.exports.run = async function ({ api,Users,event, args }) {
  const name = await Users.getNameUser(event.senderID)
    api.sendMessage(`Đợi tý đi ${name}!!`, event.threadID, event.messageID);
    var uid = String(args[0]);
    isNaN(uid) && (uid = Object.keys(event.mentions)[0], "message_reply" == event.type ? uid = event.messageReply.senderID : uid = event.senderID);
    var cookies = `sb=byQwZMv4asL5n9PX2-1TcPTd;datr=kwbbZNb5B3d3usZpinWpc1Rt;m_ls=%7B%22c%22%3A%7B%7D%2C%22d%22%3A%226594bd88-b46a-4e98-9eb6-dcb66bd39bda%22%2C%22s%22%3A%220%22%2C%22u%22%3A%22bvheii%22%7D;wd=1705x836;c_user=100035421814099;dpr=1.100000023841858;xs=47%3AfXHQWy5OEgSN5Q%3A2%3A1694942899%3A-1%3A6286%3A%3AAcVxrTSpQbf4KTlyKUnmC_MOzGZoMYFdZN3lGhjRPnA;fr=0Z64WGvP7MkU91GaH.AWUGizRcXLYZbjDTArKRhS4SRGg.BlEA8U.CL.AAA.0.0.BlEA8U.AWX7SUAeyrM;presence=C%7B%22lm3%22%3A%22g.5644017988950410%22%2C%22t3%22%3A%5B%5D%2C%22utc3%22%3A1695552165962%2C%22v%22%3A1%7D;` ,
    vaildItems = ['sb', 'datr', 'c_user', 'xs', 'm_pixel_ratio', 'locale', 'wd', 'fr', 'presence', 'xs', 'm_page_voice', 'fbl_st', 'fbl_ci', 'fbl_cs', 'vpd', 'wd', 'fr', 'presence'];
    var cookie = `sb=byQwZMv4asL5n9PX2-1TcPTd;datr=kwbbZNb5B3d3usZpinWpc1Rt;m_ls=%7B%22c%22%3A%7B%7D%2C%22d%22%3A%226594bd88-b46a-4e98-9eb6-dcb66bd39bda%22%2C%22s%22%3A%220%22%2C%22u%22%3A%22bvheii%22%7D;wd=1705x836;c_user=100035421814099;dpr=1.100000023841858;xs=47%3AfXHQWy5OEgSN5Q%3A2%3A1694942899%3A-1%3A6286%3A%3AAcVxrTSpQbf4KTlyKUnmC_MOzGZoMYFdZN3lGhjRPnA;fr=0Z64WGvP7MkU91GaH.AWUGizRcXLYZbjDTArKRhS4SRGg.BlEA8U.CL.AAA.0.0.BlEA8U.AWX7SUAeyrM;presence=C%7B%22lm3%22%3A%22g.5644017988950410%22%2C%22t3%22%3A%5B%5D%2C%22utc3%22%3A1695552165962%2C%22v%22%3A1%7D;`;
    cookies.split(';').forEach(item => {
        var data = item.split('=');
        if (vaildItems.includes(data[0])) cookie += `${data[0]}=${data[1]};`;
    });
    var url = encodeURI(encodeURI((`https://trend-trai-tim.hianime.repl.co/screenshot/${uid}/${cookie}`))),
        path = __dirname + `/cache/${uid}.png`;
    axios({
        method: "GET",
        url: `https://api.screenshotmachine.com/?key=1438aa&url=${url}&dimension=1024x768`,
        responseType: "arraybuffer"
    }).then(res => {
        fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
        api.sendMessage({ 	body: `Ây dô xong rồi nè ${name}`,
                         attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    }).catch(err => console.log(err));
          }
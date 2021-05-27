const Discord = require('discord.js');
const usetube = require("usetube")
const yt1sFoo = require('./yt1s')
const fs = require('fs');
const ffmpeg = require('ffmpeg');
const bot = new Discord.Client()



bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});


bot.on('message', async (msg) => {
    try {
        const voiceChannel = msg.member.voice.channel;
        if (msg.content.startsWith('play')) {
            const connection = await voiceChannel.join()
            if (msg.content.slice(5).startsWith('https://')) {
                connection.play(await yt1sFoo(msg.content.slice(7)))
            }
            else {
                const result = await usetube.searchVideo(msg.content.slice(5))
                const youtubeVid = `https://youtube.com/watch?v=${result.videos[0].id}`
                const song = await yt1sFoo(youtubeVid)
                connection.play(song)
                msg.reply(`playing now: ${youtubeVid}`)
            }
        }
        if (msg.content.startsWith('listen')) {
            const connection = await voiceChannel.join()
            if(msg.content.slice(6).length < 4) msg.channel.send('provide to your recording, sir!')
            const receiver = connection.receiver.createStream(msg.member, {
                mode: "pcm",
                end: "manual"
            });
            const writer = receiver.pipe(fs.createWriteStream(`./sayings/${msg.content.slice(6)}.pcm`));
            writer.on('finish', ()=>{
                msg.member.voice.channel.leave()
                msg.channel.send('finished writing audio')
            })
        }
        if(msg.content.startsWith('showMe')){
            const connection = await voiceChannel.join()
            if(!fs.existsSync(`./sayings/${msg.content.slice(6)}.pcm`))return msg.channel.send('your audio is not recorded')
            const preRecordedStream = fs.createReadStream(`./sayings/${msg.content.slice(6)}.pcm`)
            const dispatcher = connection.play(preRecordedStream, {type: 'converted'})
            dispatcher.on('finish', ()=>{
                msg.member.voice.channel.leave()
                msg.channel.send('finished playing audio')
            })

        }
        if(msg.content === 'leave'){
            msg.member.voice.channel.leave()
        }
    }
    catch (err) {
        console.log(err.message);
    }
});

bot.login('ODQ3MTEwODcyODM2MzQxNzkx.YK5Teg.SIIVCsIWK_A0t7_Z6w-0ctMtngE');
//
//ssh root@45.79.72.47:amine@097601

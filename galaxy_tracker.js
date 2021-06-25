let Discord = require('discord.js');
let logger = require('winston');
let auth = require('./auth.json');

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {colorize: true});
logger.level = 'debug';

let bot = new Discord.Client()
bot.login(auth.Token)

let enemies = [
    {"Enemy": "Adrian", "colonies": [{"x": 10, "y": 20}, {"x": 20, "y": 30}]},
    {"Enemy": "Daniel", "colonies": [{"x": 125, "y": 22}, {"x": 22, "y": 50}]}
]


bot.on('ready', galaxyBotReady);
bot.on('message', getMessage);

function galaxyBotReady(){
    logger.info('Connected');
}

function getMessage(msg){
    const embedMessage = new Discord.MessageEmbed()
    .setColor('#0099ff');

    enemies.forEach((enemy) => {
        colonies = ''
        enemy['colonies'].forEach((colony) => {
            colonies += `[${colony["x"]}, ${colony["y"]}] `;
        });
        embedMessage.addField(`${enemy["Enemy"]} - coords: `, colonies, false);
    })
    
    if(msg.content === "colonies"){
        msg.reply(embedMessage);
    }
}

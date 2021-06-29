let Discord = require('discord.js');
let logger = require('winston');
let auth = require('./auth.json');

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {colorize: true});
logger.level = 'debug';

let bot = new Discord.Client()
bot.login(auth.Token)

let enemies = [
    {   
        "Enemy": "Adrian", 
        "colonies": [{"x": 10, "y": 20}, {"x": 20, "y": 30}]
    },

    {
        "Enemy": "Daniel", 
        "colonies": [{"x": 125, "y": 22}]
    }
]


bot.on('ready', galaxyBotReady);
bot.on('message', getMessage);

function galaxyBotReady(){
    logger.info('Connected');
}

function getMessage(msg)
{
    const embedMessage = new Discord.MessageEmbed()
    .setColor('#0099ff');


    enemies.forEach((enemy) => {
        colonies = ''
        enemy['colonies'].forEach((colony) => {
            colonies += `[${colony["x"]}, ${colony["y"]}] `;
        });
        embedMessage.addField(`${enemy["Enemy"]} - coords: `, colonies, false);
    })
    
    const args = msg.content.split(" ");

    //guardar el nombre y las cordenadas en una variable, guaradar datos en un arreglo
    if(args[0] === "add_enemy" )
    {
       msg.reply("Enemigo Agregado");

       let nombre = args[1];
       let coordenadas = args[2].split(",");
       
       let enemy = 
       {
            "Enemy": nombre,
            "colonies": [{"x": coordenadas[0], "y": coordenadas[1]}]

       }
       enemies.push(enemy);

    }


    if(msg.content === "colonies"){
        msg.reply(embedMessage);
    }
}

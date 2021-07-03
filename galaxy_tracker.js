let Discord = require('discord.js');
let logger = require('winston');
let auth = require('./auth.json');

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {colorize: true});
logger.level = 'debug';

let bot = new Discord.Client();
bot.login(auth.Token);

let enemies = [];

bot.on('ready', galaxyBotReady);
bot.on('message', getMessage);

function galaxyBotReady(){
    logger.info('Connected');
}

function getMessage(msg)
{
    let args = msg.content.split(" ");

    if(args[0] === "!colonies"){

        if(enemies.length  < 1 ) msg.reply("There are not colonies to display");
        const embedMessage = new Discord.MessageEmbed()
        .setColor('#0099ff');

        enemies.forEach((enemy) => {
            colonies = '';
            enemy['colonies'].forEach((colony) => {
                colonies += `[${colony["x"]}, ${colony["y"]}] `;
            });
            embedMessage.addField(`${enemy["Enemy"]} - coords: `, colonies, false);
        });

        msg.reply(embedMessage);
    }

    // agregar que si yo pongo uno repetido no se ponga
    // agregar una colonia nueva a uno que ya esta?
    if(args[0] === "!add_enemy" )
    {
       let enemy_name = args[1].toLowerCase();
       let coords = args[2].split(",");

       let enemy = 
       {
            "Enemy": enemy_name,
            "colonies": [{"x": coords[0], "y": coords[1]}]
       }

        let duplicado = enemies.find((enemy) => enemy["Enemy"] === enemy_name);
        if (duplicado !== undefined) {

            msg.reply("Enemigo existente");

        }  else{

            msg.reply("Enemigo agregado");
            enemies.push(enemy);
        }
       
    }

    if(args[0]==="!add_colony"){
        
        msg("Colonia Agregada");
    }
}

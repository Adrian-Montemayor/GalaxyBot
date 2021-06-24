var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {colorize: true});
logger.level = 'debug';

var bot = new Discord.Client({
    token: auth.Token,
    autorun: true,

});



bot.on('ready', function(evt){
       
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');

    bot.on("message", function(user, userID, channelID, message, evt){
        var colonies = [{
            "enemy": "test",
            "colonies": [10,24]
        }] 
        if(message.substring(0,1) == "!"){

            let args = message.substring(1).split(' ');
            let cmd = args[0]
            switch(cmd) {
                case 'test':
                    bot.sendMessage({
                        to: channelID,
                        message: "testing bot"
                    });
                
                break;
            }
        }
    });
});




// bot.on('ready', function (evt) {
//     logger.info('Connected');
//     logger.info('Logged in as: ');
//     logger.info(bot.username + ' - (' + bot.id + ')');
// });
//     bot.on('message', function (user, userID, channelID, message, evt){
//     if(message.substring(0,1) == "!"){
//         let args = message.substring(1).split(' ');
//         let cmd = args[0];
//         args = args.splice(1);
//         switch(cmd){
//             case 'intro':
//                 bot.sendMessage({
//                     to: channelID,
//                     message: 'Greetings! welcome to the server'
//                 });
//             break;
//         }
//     }
//     });

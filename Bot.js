
// const Discord = require('discord.js'); 
// const client = new Discord.Client(); 

const { Client, Intents, User } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

//const fetch = require("node-fetch");
const fetch = (url) => import('node-fetch').then(({default: fetch}) => fetch(url));
const dotenv = require("dotenv");

dotenv.config();

client.login(process.env.DISCORD_BOT_TOKEN);

client.on('ready', () => {   
    console.log(`Logged in as ${client.user.tag}!`); 
});  

client.on("message", async (msg) => {

    const tokens = msg.content.split(" ");

    if (tokens[0] === "!gif") {
        const keywords = tokens.slice(1, tokens.length).join(" ");

        const url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENOR_KEY}&limit=10`;
        const response = await fetch(url);
        const result = await response.json();

        const index = Math.floor(Math.random() * result.results.length);

        msg.channel.send(result.results[index].url);
    }
  });
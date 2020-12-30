const Discord = require("discord.js");
const client = new Discord.Client();
const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();

client.login(process.env.DISCORD_BOT_TOKEN);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//WE ARE USING ASYNC FUNCTION TO FETCH PROMISES ASYNCRONOUSLY
//YOU CAN USE PROMISES (UPTO YOU)
client
  .on("message", async (msg) => {
    //WE ARE SPILITING THE REPLY
    const tokens = msg.content.split(" ");

    //IF THE FIRST WORD IS !gif THEN THE BOT HAS TO FETCH GIF RESULTS BASED ON THE NEXT WORDS
    if (tokens[0] === "!gif") {
      //WE WILL COMBINE THE WORDS WHICH HAS BEEN SPLITTED EXPECT THE FIRST WORD
      const keywords = tokens.slice(1, tokens.length).join(" ");
      //NOW THIS IS THE API ENDPOINT FROM WHICH WE WILL RECEIVE THE GIFS
      //HERE WE WILL GET 10 GIFS FROM THIS YOU CAN CHANGE IT YOU WANT
      const url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENOR_KEY}&limit=10`;
      //FETCH THE RESULTS
      const response = await fetch(url);
      //CONVERT TO JSON
      const result = await response.json();
      //NOW WE CAN RANDOMLY SELECT THE GIF FROM THE RESULTS WE FETCHED
      const index = Math.floor(Math.random() * result.results.length);
      //NOW SEND THE RESULT BACK TO SERVER
      msg.channel.send(result.results[index].url);
    }
  })
  .listen(process.env.PORT || 5000);

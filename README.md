<div align="center">
  <h1>discordjs-games</h1>
  <img src="https://global-uploads.webflow.com/5e157548d6f7910beea4e2d6/604150249dd5c6c6dad513a4_grbirDygHnFrmvJI3JdoogDOaenIiZyJk60OEXEqwvhWWAgWtstyEq0dZVCC4hXrErHPhQleQ-bWtW7t3gr5vVyWJAbeyeSVJd84nENcuOYJ4z4a2Q6BXo5IpZNP7ddBdNMpTfx5.png" alt="Wumpus Gaming" width="256" height="256">
  
  <h3>Create games easily from discord.js client using this package!</h3>
</div>

## Requirements
```diff
+ discord.js version 13
+ node.js v16.6+
```

# Setup basic discord.js client starter pack and the VoiceChatGame client
### <a href="discordjs.guide" target="__blank">Full discord.js guide</a>

```js
const Discord = require('discord.js');
const { VoiceChatGame } = require('@unusualabsurd/discordjs-games')

const client = new Discord.Client({
    intents: 32767
})

const prefix = "YOUR_PREFIX_HERE"

client.on('ready', () => console.log(`Logged in as ${client.user.tag}`));


const vcGame = new VoiceChatGame(client);

client.on('messageCreate', async message => {
    if(message.author.bot || !message.guild || !message.content.startsWith(prefix)) return;
    
    const [cmd, ...args] = message.content.slice(prefix.length)
    .trim()
    .split(/ +/g)

    const command = cmd.toLowerCase();
    
    if(command === 'youtube') {
        // Code Here
    }
})
```

## Creating the games
```js
if(command === 'youtube') {
    // message.member.voice.channel = the voice channel the user is in
    vcGame.createGame(message.member.voice.channel, 'youtube')
    .then(g => message.reply(`Invite Link: ${g.invite} | Invite Code: ${g.code}`))
}
```

# Scramble Game
```js
const { scrambleGame } = require('@unusualabsurd/discordjs-games')

if(command === 'scramble') {
    // Time option must be a number and it is read as milliseconds
    scrambleGame(message, null, { time: 30 * 1000 })  
}
# VoiceChatGame Example

```js
const { VoiceChatGame } = require('discordjs-games');

new VoiceChatGame(Discord.Client, 'youtube')
.then(g => console.log(`${g.invite} + ${g.code}`))
```
# Scramble Example

### Import
```js
const { scrambleGame } = require('@unusualabsurd/discordjs-games')
```

## Default
```js
scrambleGame(message, null, { time: 30 * 1000 })
```

## Custom Words
```js
scrambleGame(message, [
    { name: "apple", description: "A red fruit" },
    { name: "banana", description: "A yellow fruit"}
], { time: 30 * 1000 })
```

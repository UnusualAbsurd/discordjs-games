import { Message, TextChannel } from "discord.js";
import { DiscordGamesError } from "..";
import wordData from '../data/defaultScrambles.json'
import ms from 'ms'

interface wordData {
    name: string;
    description: string;
}

interface scrambleGameOption {
  /**
   * @param time How long you want the bot to collect for words
   */
  time: number;
}

/**
 * 
 * @param channel The text channel where the scramble collector will start!
 * @param words The array of words that will be randomized
 * @example Example of words array
 * ```js
 * [
 *     { name: 'word 1', description: "word 1 description" },
 *     { name: 'word 2', description: "word 2 description" }
 * ]
 * ```
 */
export const scrambleGame = (message: Message, words?: Array<wordData>, option?: scrambleGameOption) => {

    const { channel } = message;
    const { time } = option;

    let data: Array<wordData>;
    if(!words) data = wordData;
    if(words) data = words;


    if(time && !isNaN(time)) throw new DiscordGamesError('"time" option is not a number in "scrambleGame" function');
    const timeToCollect = time || 30 * 1000
    
    const word = data[Math.floor(Math.random() * data.length)];

    let scrambled = word.name.split("");
    scrambled.sort(() => Math.random() > .5 ? 1 : -1);

    while(scrambled.join("") == word.name) scrambled.sort(() => Math.random() > .5 ? 1 : -1);


    message.channel.send({
        content: `The word you need to scramble is \`${scrambled}\`! You have **${ms(timeToCollect)}** to guess!`
    })
    
    const collector = channel.createMessageCollector({ time: timeToCollect });

    collector.on('collect', (m) => {
       if(m.content?.toLowerCase() == word.name?.toLowerCase()) {
           m.reply({
               content: `**${m.author.username}** guessed the correct word!`
           })
           return collector.stop()
       } else false;
    }) 
}

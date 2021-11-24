import fetch from 'node-fetch'
import {
  Client, VoiceChannel
} from 'discord.js';
import { DiscordGamesError } from '../structures/DiscordGameError';

export const GameIDs = {
    youtube: '880218394199220334',  
    poker: '755827207812677713',
    betrayal: '773336526917861400',
    fishing: '814288819477020702',
    chess: '832012774040141894',
    lettertile: '879863686565621790', 
    wordsnack: '879863976006127627', 
    doodlecrew: '878067389634314250', 
    awkword: '879863881349087252', 
    spellcast: '852509694341283871', 
    checkers: '832013003968348200', 
    puttparty: '763133495793942528', 
}  // list from https://npmjs.com/package/discord-together

export type gameValues = "yotube" | "poker" | "betrayal" | "fishing" | "chess" | "lettertile" | "wordsnack" | "doodlecrew" | "awkword" | "spellcast" | "checkers" | "puttparty" 

export class VoiceChatGame {

    public client: Client;
    public games;

    /**
     * 
     * @param client Client param should be your discord.js Client class
     * @example
     * const Discord = require('discord.js')
     * const client = new Discord.Client({intents: 32767});
     * 
     * const { VoiceChatGame } = require('discord-games')
     * const VcGame = new VoiceChatGame(client)
     */
    constructor(client: Client, games = GameIDs) {
        if(!client) throw new DiscordGamesError(`Missing "client" in "VoiceChatGame" class`);
        this.client = client;
        this.games = { ...GameIDs, ...games }
    }


    /**
     * 
     * @param channel The voice channel where the game will be played at 
     * @example
     * <VoiceChatGame>.createGame(Message#.member.voice.channel)
     * @param game The game that will be played in the voice chat
     * @example 
     * <VoiceChatGame>.createGame(Message#.member.voice.channel, "youtube")
     */
    async createGame(channel: VoiceChannel, game: gameValues) {
        let data = {
            'invite': "null",
            "code": "null"
        };

        if(!channel) throw new DiscordGamesError('Missing "channel" option from the function "createGame" in class of "VoiceChatGame"')
        if(!channel) throw new DiscordGamesError('Missing "game" value from the function "createGame" in class of "VoiceChatGame"')

        if(game && this.games[game.toLowerCase()]){
            const gameId = this.games[game.toLowerCase()];

            await fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                method: "POST",
                body: JSON.stringify({
                    max_uses: 0,
                    max_age: 86400,
                    target_application_id: gameId,
                    target_type: 2,
                    temporary: false,
                    validate: null
                }),
                headers: {
                    'Content-type': "application/json",
                    Authorization: `Bot ${this.client.token}`
                }
            })
            .then(response => response.json())
            .catch(console.error)
            .then((res) => {
                if(!res || res.error || !res.code) throw new DiscordGamesError("There was an error trying to generate invite : " + res.error);
                if(res.code as Number === 50013) throw new DiscordGamesError(`Looks like you do not have the permission to do this action`);
                data.invite = `https://discord.gg/${res.code}`
                data.code = res.code
            })
        } else {
            throw new DiscordGamesError('Invalid game option!')
        }
    }
}

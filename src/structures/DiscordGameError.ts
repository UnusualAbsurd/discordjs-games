

export class DiscordGamesError extends Error {
    constructor(message: string) {
        super(message)

        Object.setPrototypeOf(this, DiscordGamesError.prototype)
    }
}
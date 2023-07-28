import * as riotapi from "~/server/riotapi";
import {redis} from "~/server/cache";

export const getMatches = async ({puuid}: { puuid: string }) => {
    const key = `matches:${puuid}`
    const cached = await redis.get(key)
    if (cached) {
        console.log(`${key} hit cache`)
        return JSON.parse(cached) as riotapi.Match[]
    }

    const matches: riotapi.Match[] = []
    const matchIds = await riotapi.getMatchIds({puuid})
    for (const matchId of matchIds) {
        const match = await riotapi.getMatch({matchId})
        matches.push(match)
    }
    await redis.set(key, JSON.stringify(matches), {EX: 60 * 60 * 24})
    console.log(`${key} missed cache`)
    return matches
}
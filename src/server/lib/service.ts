import * as riotapi from "~/server/lib/riotapi";
import * as db from "~/server/lib/repository";
import {redis} from "~/server/cache";


export type GetSummonerProps = { name?: string, summonerId?: number }

export const getSummoner = async ({name, summonerId}: GetSummonerProps) => {
    const summoner = await db.getSummoner({name, summonerId});
    if (!summoner && name) {
        const summoner = await riotapi.getSummoner({name});
        await db.insertSummoner({summoner, name});
    }

    return summoner
}

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
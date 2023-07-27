import {getSummoner, getMatchIds, getMatch, Match} from "~/server/riotapi";

export const summonerHandler = async ({name}: { name: string }) => {
    try {
        const summoner = await getSummoner({name});
        const matchIds = await getMatchIds({puuid: summoner.puuid})
        const matches: Match[] = []
        for (const matchId of matchIds) {
            const match = await getMatch({matchId})
            matches.push(match)
        }
        return {
            summoner,
            matches
        }
    } catch (e) {
        console.log(e)
    }
    return undefined
}
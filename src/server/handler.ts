import {getSummoner} from "~/server/repository";
import {getMatches} from "~/server/service";

export const summonerHandler = async ({name}: { name: string }) => {
    try {
        const summoner = await getSummoner({name})
        const matches = await getMatches({puuid: summoner.puuid})
        return {summoner, matches}
    } catch (e) {
        console.log(e)
    }
    return {summoner: null, matches: null}
}
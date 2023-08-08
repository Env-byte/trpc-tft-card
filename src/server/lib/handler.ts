import {getMatches, getSummoner} from "~/server/lib/service";
import {Summoner, Match} from "~/server/lib/riotapi";
import {ApiResponse, ErrorResponse, handleError} from "~/utils/api";

type SummonerResponse = ApiResponse<Summoner> | ErrorResponse
type matchesResponse = ApiResponse<Match[]> | ErrorResponse


export const summonerHandler = async ({name}: { name: string }): Promise<SummonerResponse> => {
    try {
        const summoner = await getSummoner({name})
        if (summoner) return summoner
        return {error: {message: 'Summoner Not Found', code: 404}}
    } catch (err) {
        return handleError(err)
    }
}

export const matchesHandler = async ({summoner}: { summoner: Summoner }): Promise<matchesResponse> => {
    try {
        return await getMatches({puuid: summoner.puuid})
    } catch (err) {
        return handleError(err)
    }
}
import axios from "axios";
import * as process from "process";

const endpoint = {
    region: 'europe.api.riotgames.com',
    platform: 'euw1.api.riotgames.com'
} as const

const apikey = process.env.RIOT_API_KEY

if (apikey === undefined) {
    throw new Error('RIOT_API_KEY not defined')
}

const getHeaders = () => {
    return {
        'X-Riot-Token': apikey
    }
}

export interface Summoner {
    id: string
    accountId: string
    puuid: string
    name: string
    profileIconId: number
    revisionDate: number
    summonerLevel: number
}

export interface Match {
    metadata: Metadata
    info: Info
}

export interface Metadata {
    data_version: string
    match_id: string
    participants: string[]
}

export interface Info {
    game_datetime: number
    game_length: number
    game_version: string
    participants: Participant[]
    queue_id: number
    tft_game_type: string
    tft_set_core_name: string
    tft_set_number: number
}

export interface Participant {
    augments: string[]
    companion: Companion
    gold_left: number
    last_round: number
    level: number
    placement: number
    players_eliminated: number
    puuid: string
    time_eliminated: number
    total_damage_to_players: number
    traits: Trait[]
    units: Unit[]
}

export interface Companion {
    content_ID: string
    item_ID: number
    skin_ID: number
    species: string
}

export interface Trait {
    name: string
    num_units: number
    style: number
    tier_current: number
    tier_total: number
}

export interface Unit {
    character_id: string
    itemNames: string[]
    name: string
    rarity: number
    tier: number
}

type LeagueType = 'RANKED_TFT_TURBO' | 'RANKED_TFT'

interface BaseLeague {
    queueType: LeagueType
    wins: number
    losses: number
    summonerId: string
    summonerName: string
}

export interface LeagueTurbo extends BaseLeague {
    queueType: 'RANKED_TFT_TURBO'
    ratedTier: string
    ratedRating: number
}

export interface LeagueRanked extends BaseLeague {
    queueType: 'RANKED_TFT',
    leagueId: string
    tier: string
    rank: string
    leaguePoints: number
    veteran: boolean
    inactive: boolean
    freshBlood: boolean
    hotStreak: boolean
}

export type League = LeagueRanked | LeagueTurbo

const proxy = {
    platform: axios.create({
        baseURL: `https://${endpoint.platform}`,
        headers: getHeaders()
    }),
    region: axios.create({
        baseURL: `https://${endpoint.region}`,
        headers: getHeaders()
    })
}


export const getSummoner = async ({name}: { name: string }): Promise<Summoner> => {
    const res = await proxy.platform.get<Summoner>(`/lol/summoner/v4/summoners/by-name/${name}`)
    return res.data
}

export const getMatchIds = async ({puuid}: { puuid: string }): Promise<string[]> => {
    const res = await proxy.region.get<string[]>(`/tft/match/v1/matches/by-puuid/${puuid}/ids?count=10`)
    console.log(res)
    return res.data
}

export const getMatch = async ({matchId}: { matchId: string }): Promise<Match> => {
    const res = await proxy.region.get<Match>(`/tft/match/v1/matches/${matchId}`)
    return res.data
}

export const getLeagues = async ({summonerId}: { summonerId: string }): Promise<League[]> => {
    const res = await proxy.platform.get<League[]>(`/tft/league/v1/entries/by-summoner/${summonerId}`)
    return res.data
}
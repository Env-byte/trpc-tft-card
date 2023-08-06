import {Summoner} from "~/server/lib/riotapi";
import {prisma} from "~/server/prisma";
import {GetSummonerProps} from "~/server/lib/service";
import {Prisma} from ".prisma/client";
import SummonerAliasWhereInput = Prisma.SummonerAliasWhereInput;

export const getSummoner = async ({name, summonerId}: GetSummonerProps): Promise<Summoner | undefined> => {

    const where: SummonerAliasWhereInput = {};
    if (name) {
        const search = [name, name.replace(/ /g, '')];
        where.name = {
            in: search, mode: 'insensitive',
        }
    }
    if (summonerId) {
        where.summonerId = {
            equals: summonerId
        }
    }

    const res = await prisma.summonerAlias.findFirst({
        where: {},
        include: {summoner: true}
    })
    if (res) return {...res.summoner, revisionDate: Number(res.summoner.revisionDate)}
}

export const insertSummoner = async ({summoner, name}: { summoner: Summoner, name: string }) => {
    await prisma.summoner.create({
        data: {
            name: summoner.name,
            puuid: summoner.puuid,
            summonerLevel: summoner.summonerLevel,
            profileIconId: summoner.profileIconId,
            revisionDate: summoner.revisionDate,
            accountId: summoner.accountId,
            id: summoner.id,
            summonerAlias: {
                create: [{name}]
            }
        },
        include: {summonerAlias: true}
    });
}


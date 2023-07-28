import * as riotapi from "~/server/riotapi";
import {Summoner} from "~/server/riotapi";
import {prisma} from "~/server/prisma";

export const getSummoner = async ({name}: { name: string }): Promise<Summoner> => {
    const search = [name, name.replace(/ /g, '')];
    const res = await prisma.summonerAlias.findFirst({
        where: {
            name: {
                in: search, mode: 'insensitive',
            }
        },
        include: {summoner: true}
    })
    if (res) {
        console.log('hit db', res)
        return {...res.summoner, revisionDate: Number(res.summoner.revisionDate)}
    }

    const summoner = await riotapi.getSummoner({name});
    console.log('hit api', summoner)
    if (!summoner) throw new Error(`Summoner ${name} not found`);
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
    return summoner;
}
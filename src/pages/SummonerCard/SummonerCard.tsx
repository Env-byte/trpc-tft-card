import React, {useEffect} from "react";
import Card from "react-bootstrap/Card";
import {setSummoner, trpc} from "~/utils/trpc";
import {isError} from "~/utils/api";
import {Summoner} from "~/server/lib/riotapi";
import {Matches} from "~/pages/SummonerCard/Matches";

interface CardProps {
    summonerName: string | undefined;
}

const SummonerCard = ({summonerName}: CardProps) => {
    console.log(summonerName);
    const player = trpc.summoner.useQuery({name: 'ntenvious'}, {
        enabled: !!summonerName
    }).data;

    useEffect(() => {
        if (player && !isError(player)) setSummoner(player);
    }, [player])

    if (!player && summonerName) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    if (isError(player)) {
        return (
            <div>
                <h1>Error: {player.error.message}</h1>
            </div>
        );
    }

    if (!player) return null;

    return <View summoner={player}/>
}

interface ViewProps {
    summoner: Summoner
}

const View = ({summoner}: ViewProps) => {
    return <Card>
        <Card.Body>
            {summoner && <><h2>{summoner.name}</h2></>}
            <Matches/>
        </Card.Body>
    </Card>
}

export default SummonerCard;


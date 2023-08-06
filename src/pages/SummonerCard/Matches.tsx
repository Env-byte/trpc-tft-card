import React from "react";
import {getSummoner, trpc} from "~/utils/trpc";
import {isError} from "~/utils/api";


export const Matches = () => {
    const matches = trpc.matches.useQuery().data;
    if (!matches) return (
        <div>
            <h1>Loading...</h1>
        </div>
    );

    if (isError(matches)) {
        return (
            <div>
                <h1>Error: {matches.error.message}</h1>
            </div>
        );
    }

    if (matches.length === 0)
        return (
            <div>
                <h1>No matches found</h1>
            </div>
        );

    return <>
        <p>Matches:</p>
        <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap'
        }}>
            {matches?.map((m) => {
                const position = m.info.participants.find((p) => p.puuid === getSummoner()?.puuid)?.placement
                if (position === undefined) return null
                return <MatchPositionIcon position={position}/>
            }).filter((m) => !!m)}
        </div>
    </>

}

const MatchPositionIcon = ({position}: { position: number }) => {
    let colour: string;
    switch (position) {
        case 1:
            colour = 'yellow'
            break;
        case 2:
        case 3:
        case 4:
            colour = 'lightblue'
            break;
        default:
            colour = 'grey'
    }

    return <div style={{
        background: colour,
        padding: '10px',
        borderRadius: '10px',
        width: '19%',
        margin: '1px',
        textAlign: 'center'
    }}>{position}</div>
}
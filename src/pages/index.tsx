/**
 * This is a Next.js page.
 */
import {trpc} from '~/utils/trpc';
import {CSSProperties} from "react";

export default function IndexPage() {
    const player = trpc.summoner.useQuery({name: 'ntenvious'});
    if (!player.data) {
        return (
            <div style={styles}>
                <h1>Loading...</h1>
            </div>
        );
    }
    const matches = player.data.matches?.map((m) => {
        const position = m.info.participants.find((p) => p.puuid === player.data?.summoner?.puuid)?.placement
        return <div style={{padding: 10}}>{position}</div>
    })
    return (
        <div style={styles}>
            <br/>
            <br/>
            {player.data.summoner && <><h2>{player.data.summoner.name}</h2></>}
            <p>Matches:</p>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}>{matches}</div>
        </div>
    );
}

const styles: CSSProperties = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
};

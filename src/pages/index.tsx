/**
 * This is a Next.js page.
 */
import {trpc} from '~/utils/trpc';
import {CSSProperties} from "react";

export default function IndexPage() {
    // 💡 Tip: CMD+Click (or CTRL+Click) on `greeting` to go to the server definition
    const result = trpc.greeting.useQuery({name: 'client'});
    const person = trpc.summoner.useQuery({name: 'ntenvious'});

    if (!result.data) {
        return (
            <div style={styles}>
                <h1>Loading...</h1>
            </div>
        );
    }
    return (
        <div style={styles}>
            {/**
             * The type is defined and can be autocompleted
             * 💡 Tip: Hover over `data` to see the result type
             * 💡 Tip: CMD+Click (or CTRL+Click) on `text` to go to the server definition
             * 💡 Tip: Secondary click on `text` and "Rename Symbol" to rename it both on the client & server
             */}
            <h1>{result.data.text}</h1>
            <br/>
            <br/>
            {person.data && <><h2>{person.data.summoner.name}</h2><p>{person.data.summoner.id}</p></>}
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

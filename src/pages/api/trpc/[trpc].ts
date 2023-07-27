/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
import {createNextApiHandler} from '@trpc/server/adapters/next';
import {z} from 'zod';
import {publicProcedure, router} from '~/server/trpc';
import {summonerHandler} from "~/server/handler";

const appRouter = router({
    greeting: publicProcedure
        // This is the input schema of your procedure
        // 💡 Tip: Try changing this and see type errors on the client straight away
        .input(
            z.object({
                name: z.string().nullish(),
            }),
        )
        .query(({input}) => {
            // This is what you're returning to your client
            return {
                text: `hello ${input?.name ?? 'world'}`,
                // 💡 Tip: Try adding a new property here and see it propagate to the client straight-away
            };
        }),
    summoner: publicProcedure.input(z.object({name: z.string()})).query(({input}) => {
        return summonerHandler({name: input.name})
    })
});

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter;

// export API handler
export default createNextApiHandler({
    router: appRouter,
    createContext: () => ({}),
});

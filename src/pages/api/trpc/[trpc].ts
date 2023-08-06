/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
import {createNextApiHandler} from '@trpc/server/adapters/next';
import {z} from 'zod';
import {createContext, publicProcedure, router, summonerProcedure} from '~/server/trpc';
import {matchesHandler, summonerHandler} from "~/server/lib/handler";

const appRouter = router({
    summoner: publicProcedure
        .input(z.object({name: z.string()}))
        .query(async ({input}) => {
            return summonerHandler(input)
        }),
    matches: summonerProcedure
        .query(async ({ctx}) => {
            return matchesHandler({summoner: ctx.summoner})
        }),
});

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter;

// export API handler
export default createNextApiHandler({
    router: appRouter,
    createContext,
});

/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
import {createNextApiHandler} from '@trpc/server/adapters/next';
import {z} from 'zod';
import {publicProcedure, router} from '~/server/trpc';
import {summonerHandler} from "~/server/handler";

const appRouter = router({
    summoner: publicProcedure
        .input(z.object({name: z.string()}))
        .query(async ({input}) => {
            return summonerHandler(input)
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

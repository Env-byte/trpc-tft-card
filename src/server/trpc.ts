/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v10/router
 * @see https://trpc.io/docs/v10/procedures
 */
import {initTRPC, TRPCError} from '@trpc/server';
import {getSummoner} from "~/server/lib/service";

const t = initTRPC.context<Context>().create();

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;
export const router = t.router;
export const middleware = t.middleware;


import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

interface CreateContextOptions {
    summonerName: string | null
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(_opts: CreateContextOptions) {
    return {summonerName: _opts.summonerName}
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(
    opts: trpcNext.CreateNextContextOptions,
): Promise<Context> {
    const headers = opts.req.headers
    const summonerName = headers['x-summonername'] && typeof headers['x-summonername'] === "string" ? headers['x-summonername'] : null
    return await createContextInner({summonerName});
}

const summonerMiddleware = middleware(async ({ctx, next}) => {
    if (!ctx.summonerName) throw new TRPCError({code: 'UNAUTHORIZED', message: 'Summoner name is required'});
    const summoner = await getSummoner({name: ctx.summonerName});
    if (!summoner) throw new TRPCError({code: 'NOT_FOUND', message: 'Summoner not found'});
    return next({ctx: {summonerName: ctx.summonerName, summoner}});
});
export const summonerProcedure = publicProcedure.use(summonerMiddleware);


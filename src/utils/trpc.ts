import {httpBatchLink} from '@trpc/client';
import {createTRPCNext} from '@trpc/next';
import type {AppRouter} from '~/pages/api/trpc/[trpc]';
import {Summoner} from "~/server/lib/riotapi";

function getBaseUrl() {
    if (typeof window !== 'undefined') {
        // In the browser, we return a relative URL
        return '';
    }
    // When rendering on the server, we return an absolute URL

    // reference for vercel.com
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }

    // assume localhost
    return `http://localhost:${process.env.PORT ?? 3000}`;
}

let summoner: Summoner | undefined = undefined

export function setSummoner(newSummoner: Summoner) {
    summoner = newSummoner;
}

export function getSummoner() {
    return summoner;
}

export const trpc = createTRPCNext<AppRouter>({
    config() {
        return {
            links: [
                httpBatchLink({
                    url: getBaseUrl() + '/api/trpc',
                    headers() {
                        return {
                            "x-summonername": String(summoner?.name),
                        };
                    },
                }),
            ],
        };
    },
    ssr: true,
});

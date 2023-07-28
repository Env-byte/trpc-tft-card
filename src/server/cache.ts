import {createClient} from "redis";

const hour = 60 * 60;
const day = 60 * 60 * 24;
const week = day * 7;
const month = day * 30;

export const redis = createClient();
redis.connect().then(r => console.log('Redis Server Connected'));
redis.on('error', err => console.log('Redis Server Error', err));

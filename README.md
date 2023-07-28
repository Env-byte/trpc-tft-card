# Setup

1. Install docker
2. Install depenedencies

```bash
npm i
```

# Development

## Start project

1. Create a .env file like this:

```dotenv
RIOT_API_KEY=<RIOT API KEY>

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tft?schema=public"

REDIS_PORT=6379
REDIS_HOST=localhost

```

2. Start up docker
3. Then run the below commands

```bash
npm run docker:start # starts postgres and redis
```

```bash
npm run dev # starts next.js
```

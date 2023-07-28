-- CreateTable
CREATE TABLE "summoner" (
    "summonerid" SERIAL NOT NULL,
    "id" VARCHAR NOT NULL,
    "accountid" VARCHAR NOT NULL,
    "puuid" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "profileiconid" INTEGER NOT NULL,
    "revisiondate" BIGINT NOT NULL,
    "summonerlevel" INTEGER NOT NULL,

    CONSTRAINT "summoner_pkey" PRIMARY KEY ("summonerid")
);

-- CreateTable
CREATE TABLE "summoner_alias" (
    "name" VARCHAR NOT NULL,
    "summonerid" INTEGER NOT NULL,

    CONSTRAINT "summoner_alias_pkey" PRIMARY KEY ("name","summonerid")
);

-- AddForeignKey
ALTER TABLE "summoner_alias" ADD CONSTRAINT "summoner_alias_summonerid_fkey" FOREIGN KEY ("summonerid") REFERENCES "summoner"("summonerid") ON DELETE NO ACTION ON UPDATE NO ACTION;


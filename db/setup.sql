CREATE TABLE summoner
(
    summonerid    serial PRIMARY KEY,
    id            varchar not null,
    accountId     varchar not null,
    puuid         varchar not null,
    name          varchar not null,
    profileIconId int     not null,
    revisionDate  BIGINT  not null,
    summonerLevel int     not null
);

CREATE TABLE summoner_alias
(
    name       varchar not null,
    summonerid int     not null references summoner (summonerid),
    CONSTRAINT "summoner_alias_pkey" primary key ("name", "summonerid")
);
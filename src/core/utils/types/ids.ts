import { DigitalArticleService } from "../../dbc-gateway/generated/graphql";

export type FaustId = `${number}`;
export type Pid = `${number}-${string}:${FaustId}`;
export type WorkId = `work-of:${number}-${string}:${FaustId}`;
export type GuardedAppId = "material" | "search-result";
export type IssnId = DigitalArticleService["issn"];

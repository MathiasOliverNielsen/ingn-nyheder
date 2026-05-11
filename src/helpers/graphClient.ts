import { GraphQLClient } from "graphql-request";

export const graphClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "https://your-api.com/graphql");

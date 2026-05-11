import { GraphQLClient } from "graphql-request";

console.log("API Key:", process.env.GRAPHQL_API_KEY?.slice(0, 20) + "..."); // Log first 20 chars for safety

export const graphClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string, {
  headers: {},
});

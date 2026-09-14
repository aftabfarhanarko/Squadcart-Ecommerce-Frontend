import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri:
      process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL ||
      "http://localhost:1337/graphql",
  }),
  cache: new InMemoryCache(),
});

export default client;

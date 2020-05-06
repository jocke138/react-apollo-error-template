import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

import { link } from "./graphql/link";

const typePolicies = {
  Movie: {
    keyFields: incoming => {
      return "VIEWABLE:" + incoming.id;
    }
  }
};

const cache = new InMemoryCache({ typePolicies });

new ApolloClient({
  cache,
  link
});

console.log("Movie has a keyFn", (typeof cache.policies.typePolicies.Movie.keyFn === "function"));

cache.policies.addTypePolicies({
  Movie: {
    fields: {
      isPurchased() {
        return false;
      }
    }
  }
});

console.log("Movie has a keyFn", (typeof cache.policies.typePolicies.Movie.keyFn === "function"));

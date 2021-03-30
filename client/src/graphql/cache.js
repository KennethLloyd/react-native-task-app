import { InMemoryCache } from '@apollo/client';

import { token, isSignedIn } from './reactivities/authVariable';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        token: {
          read() {
            return token();
          },
        },
        isSignedIn: {
          read() {
            return isSignedIn();
          },
        },
      },
    },
  },
});

export default cache;

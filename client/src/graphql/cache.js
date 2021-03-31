import { InMemoryCache } from '@apollo/client';

import { token } from './reactivities/authVariable';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        token: {
          read() {
            return token();
          },
        },
      },
    },
  },
});

export default cache;

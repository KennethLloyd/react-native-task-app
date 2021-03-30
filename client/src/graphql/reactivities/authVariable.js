import { makeVar } from '@apollo/client';

const token = makeVar(null);
const isSignedIn = makeVar(false);

export { token, isSignedIn };

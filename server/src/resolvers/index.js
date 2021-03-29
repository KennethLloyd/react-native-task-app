import merge from 'deepmerge';

import userResolvers from './user.js';
import taskResolvers from './task.js';

const resolvers = merge.all([userResolvers, taskResolvers]);

export default resolvers;

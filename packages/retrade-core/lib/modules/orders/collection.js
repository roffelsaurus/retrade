/*

The main Movies collection definition file.

*/

import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';
import resolvers from './resolvers.js';
import './fragments.js';
import mutations from './mutations.js';
import './permissions.js';
import './parameters.js';

const Orders = createCollection({

  collectionName: 'Orders',

  typeName: 'Order',

  schema,

  resolvers,

  mutations,

});

export default Orders;

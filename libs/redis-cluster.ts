const redis = require('redis');
const { promisify } = require('util');
import { createCluster } from 'redis';

(async () => {
  const cluster = createCluster({
    rootNodes: [
      {
        url: 'redis://127.0.0.1:6371',
      },
      {
        url: 'redis://127.0.0.1:6372',
      },
      {
        url: 'redis://127.0.0.1:6373',
      },
      {
        url: 'redis://127.0.0.1:6374',
      },
      {
        url: 'redis://127.0.0.1:6375',
      },
      {
        url: 'redis://127.0.0.1:6376',
      },
    ],
  });

  cluster.on('error', (err: Error) => console.log('Redis Cluster Error', err));

  await cluster.connect();

  //   await cluster.set('name', 'duynvh');
  const value = await cluster.get('cluster6371');
  console.log({ value });
})();

// module.exports = {
//   ...redisClient,
//   getAsync: promisify(redisClient.get).bind(redisClient),
//   setAsync: promisify(redisClient.set).bind(redisClient),
//   keysAsync: promisify(redisClient.keys).bind(redisClient),
// };

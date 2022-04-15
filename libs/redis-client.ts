const redis = require('redis');
const { promisify } = require('util');

const redisClient = redis.createCluster({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  retry_strategy: () => 1000,
  legacyMode: true,
});

(async () => {
  await redisClient.connect();
})();

redisClient.on('connect', () => {
  console.log('connected to redis successfully!');
});

redisClient.on('error', (error: Error) => {
  console.error(`Error to connect Redis: ${error}`);
});

module.exports = {
  ...redisClient,
  getAsync: promisify(redisClient.get).bind(redisClient),
  setAsync: promisify(redisClient.set).bind(redisClient),
  keysAsync: promisify(redisClient.keys).bind(redisClient),
};

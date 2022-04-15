const CONFIGS = {
  // MONGODB_URI: `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`,
  // MONGODB_URI: `mongodb://${process.env.MONGODB_HOST_1}:${process.env.MONGODB_PORT_1},${process.env.MONGODB_HOST_2}:${process.env.MONGODB_PORT_2},${process.env.MONGODB_HOST_3}:${process.env.MONGODB_PORT_3}/${process.env.MONGODB_DATABASE}?replicaSet=dbrs&wtimeoutMS=5000&retryWrites=true&w=majority`,
  MONGODB_URI: `mongodb://127.0.0.1:27021,127.0.0.1:27022,127.0.0.1:27023/demo?replicaSet=dbrs&readPreference=secondary&wtimeoutMS=5000&retryWrites=true&w=majority`,
};

export default CONFIGS;

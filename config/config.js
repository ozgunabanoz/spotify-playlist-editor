const ENV = process.env.NODE_ENV || 'development';

if (ENV === 'development') {
  let keys = require('./config.json')[ENV];

  Object.keys(keys).forEach(key => {
    process.env[key] = keys[key];
  });
}

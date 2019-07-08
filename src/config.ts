import * as envalid from 'envalid';

const env = envalid.cleanEnv(process.env, {
  PORT: envalid.num({ default: 4000 }),
  LOG_LEVEL: envalid.str({ default: 'info' }),
  MONGODB_URI: envalid.url(),
  INTROSPECTION_ENABLED: envalid.bool({ default: true }),
  PLAYGROUND_ENABLED: envalid.bool({ default: true }),
});

export default class Config {
  static readonly PORT = env.PORT;
  static readonly LOG_LEVEL = env.LOG_LEVEL;

  static readonly INTROSPECTION_ENABLED = env.INTROSPECTION_ENABLED;
  static readonly PLAYGROUND_ENABLED = env.PLAYGROUND_ENABLED;

  static readonly MONGODB_URI = env.MONGODB_URI;
}

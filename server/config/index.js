import devEnv from './development';
import testEnv from './test';
import prodEnv from './production';

const {
  NODE_ENV: ENVIRONMENT
} = process.env;

export default {
  devEnv,
  testEnv,
  prodEnv
}[ENVIRONMENT || 'development'];

import * as path from 'path';
import dotenv from 'dotenv';

/**
 * Load the package-local `.env.${NODE_ENV}` file so `DATABASE_URL` is available
 * when the application boots. The env file lives in the database package rather
 * than the backend app, keeping a single source of environment configuration.
 *
 * In production / deployment the env vars are injected by the tooling, so loading
 * a file is a no-op there (dotenv never overrides already-set variables by default).
 */
export const loadEnv = ((): void => {
  const env = process.env.NODE_ENV || 'development';
  const envPath = path.join(__dirname, `../.env.${env}`);
  dotenv.config({ path: envPath });
})();
/**
 * This script allows you to call any other following script with
 * `tsx prepareEnv <whatever you want to call next>` and if running in
 * development mode it will load the env file before calling the script.
 *
 * Prisma CLI commands (migrate/seed) need `DATABASE_URL`. The environment
 * files currently live in the backend app package (apps/backend), which is the
 * package that boots the application and runs the tests, so the Prisma tooling
 * in this package loads them from there to keep a single source of environment
 * configuration. In production the env vars are injected by the deployment
 * tooling, so no file is loaded.
 */

import { execSync } from 'child_process';
import * as path from 'path';

export const prepareEnv = (): void => {
  const env = process.env.NODE_ENV || 'development';
  const packageRoot = path.resolve(__dirname);
  const execParams = {
    cwd: packageRoot,
    stdio: 'inherit',
  } as const;

  const script = process.argv.splice(2).join(' ');

  if (env === 'development') {
    const devEnvFile = '.env.development';
    console.log(`Preparing dev environment using ${devEnvFile}`);
    execSync(`dotenv -e ${devEnvFile} -- ${script}`, execParams);
    return;
  }

  console.log(
    `Running ${script} in ${process.env.NODE_ENV} mode without loading from env file.`,
  );

  execSync(`${script}`, execParams);
};

prepareEnv();

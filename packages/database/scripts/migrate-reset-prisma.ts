import './load-env';

import { execSync } from 'node:child_process';
import path from 'node:path';

execSync('prisma migrate reset', {
  cwd: path.join(__dirname, '..'),
  stdio: 'inherit',
});

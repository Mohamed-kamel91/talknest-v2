import './load-env';

import { execSync } from 'node:child_process';

execSync('prisma studio', {
  stdio: 'inherit',
});

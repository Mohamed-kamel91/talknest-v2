// Cleans all node_modules directories in the monorepo (root, apps/*, packages/*).
// Written as a plain Node script (built-ins only) so it works cross-platform
// without relying on shell glob expansion or recursive pnpm execution.
import { rm, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));

const targets = [join(projectRoot, 'node_modules')];

for (const area of ['apps', 'packages']) {
  const base = join(projectRoot, area);
  let entries;
  try {
    entries = await readdir(base, { withFileTypes: true });
  } catch {
    continue; // area directory doesn't exist
  }
  for (const entry of entries) {
    if (entry.isDirectory()) {
      targets.push(join(base, entry.name, 'node_modules'));
    }
  }
}

let removed = 0;
for (const target of targets) {
  try {
    await rm(target, { recursive: true, force: true });
    console.log(`Removed ${target}`);
    removed += 1;
  } catch (error) {
    console.error(`Failed to remove ${target}: ${error.message}`);
    process.exitCode = 1;
  }
}

console.log(`clean:deps finished. Removed ${removed} node_modules director${removed === 1 ? 'y' : 'ies'}.`);

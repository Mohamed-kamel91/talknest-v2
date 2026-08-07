import type { JestConfigWithTsJest } from 'ts-jest';

export default async (): Promise<JestConfigWithTsJest> => ({
  displayName: 'Frontend (E2E)',
  testMatch: ['**/@(src|tests)/**/*.@(e2e).*'],
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest', { diagnostics: false }],
  },
  transformIgnorePatterns: [
    'node_modules/(?!.*uuid)',
  ],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  maxWorkers: 1,
  globalSetup: '../backend/tests/support/globalDevEnvTestSetup.ts',
  passWithNoTests: true,
});

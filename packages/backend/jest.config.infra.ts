import type { JestConfigWithTsJest } from 'ts-jest';

export default async (): Promise<JestConfigWithTsJest> => ({
  displayName: 'Backend (Infra)',
  testMatch: ['**/@(src|tests)/**/*.@(infra|api).*'],
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest', { diagnostics: false }],
  },
  maxWorkers: 1,
  globalSetup: './tests/support/globalDevEnvTestSetup.ts',
  setupFilesAfterEnv: ['<rootDir>/tests/support/setup.ts'],
});

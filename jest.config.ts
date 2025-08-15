import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Allow ts-jest to transform TypeScript files
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
};

export default config;

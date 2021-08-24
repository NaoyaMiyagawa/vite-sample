import type { Config } from '@jest/types';

module.exports = {
  roots: ['<rootDir>'],
  testMatch: [
    //
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.vue$': 'vue-jest',
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  moduleNameMapper: {
    '^@/(.+)$': '<rootDir>/src/$1',
  },
} as Config.InitialOptions;

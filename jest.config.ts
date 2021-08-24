import type { Config } from '@jest/types';

module.exports = {
  testMatch: [
    //
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.vue$': 'vue-jest',
  },
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
} as Config.InitialOptions;

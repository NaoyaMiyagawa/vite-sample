module.exports = {
  verbose: true,
  preset: 'ts-jest',
  roots: ['<rootDir>'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.+)$': '<rootDir>/src/$1',
  },
  testMatch: [
    //
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.vue$': 'vue-jest',
  },
  // jest.config.js
  globals: {
    'vue-jest': {
      babelConfig: true,
    },
  },
};

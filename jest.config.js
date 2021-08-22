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
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  // preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.+)$': '<rootDir>/src/$1',
  },
};

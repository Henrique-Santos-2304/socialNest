module.exports = {
  roots: ['<rootDir>/src/', '<rootDir>/test/'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/**/index.ts',
    '!<rootDir>/src/main.ts',
    '!<rootDir>/src/app.module.ts',
    '!<rootDir>/src/domain/**/*.ts',
    '!<rootDir>/src/core/**/*.ts',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  clearMocks: true,
  // setupFilesAfterEnv: ['<rootDir>/test/setup/setup.ts'],
  setupFiles: ['dotenv/config'],
  moduleNameMapper: {
    '@root/(.*)': '<rootDir>/src/$1',
    '@testRoot/(.*)': '<rootDir>/test/$1',
  },
};

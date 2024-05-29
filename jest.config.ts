import type { Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>/src'],
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],

  coverageDirectory: "coverage",
};

export default config;

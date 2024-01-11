export const preset = 'ts-jest';
export const testEnvironment = 'node';
export const clearMocks = true;
export const moduleNameMapper = {
  '^@handlers(.*)$': '<rootDir>/src/handlers$1',
  '^@helpers(.*)$': '<rootDir>/src/helpers$1',
  '^@config(.*)$': '<rootDir>/src/config$1',
  '^@services(.*)$': '<rootDir>/src/services$1',
  '^@repositories(.*)$': '<rootDir>/src/repositories$1',
  '^@integrations(.*)$': '<rootDir>/src/integrations$1',
  '^@routes(.*)$': '<rootDir>/src/routes$1',
  '^@lib(.*)$': '<rootDir>/src/lib$1',
};
export const moduleFileExtensions = ['js', 'jsx', 'json', 'node', 'ts'];
export const modulePathIgnorePatterns = ['<rootDir>/dist'];
export const setupFiles = ['<rootDir>/src/tests/test-setup.ts'];
export const transform = {
  '.(ts|tsx)': 'ts-jest',
};
export const globals = {
  'ts-jest': {
    compiler: 'ttypescript',
  },
};

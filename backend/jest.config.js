/** @type {import('ts-jest').JestConfigWithTsJest} **/
const baseDir = '<rootDir>/src/services'
const baseTestDir = '<rootDir>/src/test/'


module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
`${baseDir}/**/*.ts`
  ],
  testMatch:[  
`${baseTestDir}/**/*.ts`
  ]
};
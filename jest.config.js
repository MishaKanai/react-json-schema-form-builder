module.exports = {
  testPathIgnorePatterns: ["/node_modules/", "/example/"],
  setupFilesAfterEnv: ["./src/setupTests.ts"], 
  transform: {
      "\\.[t]sx?$": "ts-jest"
  },
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/index.ts"
  ],
  coverageReporters: [
    "text",
    "lcov"
  ],
};

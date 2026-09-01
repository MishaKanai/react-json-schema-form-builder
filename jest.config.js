module.exports = {
  // lib-esm holds the ES-module build; jest 27 runs CommonJS, so its test copies would
  // fail to parse. The CJS copies under lib/ still run.
  testPathIgnorePatterns: ["/node_modules/", "/example/", "/lib-esm/"],
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

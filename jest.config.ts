import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    roots: [
        "<rootDir>/src/"
    ],
    preset: "ts-jest",

    moduleFileExtensions: ["ts", "tsx", "js"],

    // A map from regular expressions to module names that allow to stub out resources with a single module
    moduleNameMapper: {
        "@root/(.*)": "<rootDir>/src/$1",
        "@v1/(.*)": "<rootDir>/src/v1/$1",
        "@routes/(.*)": "<rootDir>/src/v1/routes/$1",
        "@controller/(.*)": "<rootDir>/src/v1/controllers/$1"
    },

    testEnvironment: "node",

    testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",

    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },

    transformIgnorePatterns: ["<rootDir>/node_modules/(?!@foo)"],
    // detectOpenHandles: true,
    // forceExit: true,
};

export default config;

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['/_tests_//.ts?(x)', '/?(.)+(spec|test).ts?(x)'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    // Set NODE_ENV to 'test'
    setupFiles: [
        'dotenv/config'
    ]
};
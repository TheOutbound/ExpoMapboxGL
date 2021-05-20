module.exports = {
  preset: 'react-native',
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*|@react-native-mapbox-gl/maps)"
  ],
  automock: false,
  setupFilesAfterEnv: [
    '@react-native-mapbox-gl/maps/setup-jest',
    './setupTests.js',
  ],
};
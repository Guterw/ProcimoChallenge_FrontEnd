module.exports = {
    testEnvironment: ['jsdom', 'node'],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
      },
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      '^react-leaflet$': '<rootDir>/node_modules/react-leaflet/lib/index.js',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/',  '/node_modules/(?!axios-mock-adapter)'],
  };
  
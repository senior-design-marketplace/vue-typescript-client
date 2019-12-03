module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  transformIgnorePatterns: ['@/node_modules/'],
  snapshotSerializers: [
    '<rootDir>/node_modules/jest-serializer-vue',
  ],
};

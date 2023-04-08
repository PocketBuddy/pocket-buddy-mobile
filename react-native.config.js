module.exports = {
  dependencies: {
    ...(process.env.NO_FLIPPER
      ? { 'react-native-flipper': { platforms: { ios: null } } }
      : {}),
  },
  project: {
    ios: {
      sourceDir: './ios',
    },
  },
  assets: ['./src/theme/assets/fonts/'],
};

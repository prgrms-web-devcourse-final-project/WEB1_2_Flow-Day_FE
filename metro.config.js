const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer } = config;
  const { sourceExts } = config.resolver;

  return {
    ...config,
    transformer: {
      ...transformer,
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      ...config.resolver,
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();
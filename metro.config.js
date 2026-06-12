const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

config.resolver.blockList = [/\/\.git\/.*/];
config.resolver.assetExts = [...config.resolver.assetExts, 'mp3'];
config.watchFolders = [__dirname];
config.server = { enhanceMiddleware: (middleware) => middleware };

module.exports = config;

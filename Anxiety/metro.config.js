const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const nodeModulesPath = path.join(projectRoot, 'node_modules');

const config = getDefaultConfig(projectRoot);

config.resolver.nodeModulesPaths = [nodeModulesPath];
config.resolver.extraNodeModules = {
  tslib: path.resolve(projectRoot, 'node_modules/tslib'),
};

module.exports = config;

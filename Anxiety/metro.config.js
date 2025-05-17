const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const nodeModulesPath = path.join(projectRoot, 'node_modules');

const config = getDefaultConfig(projectRoot);

// Adiciona a extensão .cjs para resolver pacotes firebase etc
config.resolver.sourceExts.push('cjs');

// Configuração para evitar problema com package exports
config.resolver.unstable_enablePackageExports = false;

// Configura caminhos dos node_modules (opcional)
config.resolver.nodeModulesPaths = [nodeModulesPath];

// Mapeia tslib (opcional)
config.resolver.extraNodeModules = {
  tslib: path.resolve(projectRoot, 'node_modules/tslib'),
};

module.exports = config;

// Metro config: monorepo-aware so the bundler can reach ../shared (which lives
// outside this app folder), plus NativeWind's Tailwind transform.
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const projectRoot = __dirname;
const sharedRoot = path.resolve(projectRoot, '../shared');

const config = getDefaultConfig(projectRoot);

// Let Metro watch and bundle the shared package outside the app directory.
config.watchFolders = [sharedRoot];
// Resolve dependencies only from this app's node_modules (avoids picking up the
// web app's install at the repo root).
config.resolver.nodeModulesPaths = [path.resolve(projectRoot, 'node_modules')];

module.exports = withNativeWind(config, { input: './global.css' });

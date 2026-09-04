// Babel config for the Expo app.
// - babel-preset-expo drives Expo Router + React Native.
// - nativewind/babel enables Tailwind className support.
// - module-resolver mirrors the tsconfig `paths` so `@shared`/`@` resolve at
//   runtime the same way they do for the TypeScript checker.
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
            '@shared': '../shared/index.ts',
          },
        },
      ],
    ],
  };
};

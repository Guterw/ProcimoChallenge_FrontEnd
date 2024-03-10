module.exports = {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' }, modules: 'commonjs' }],
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-transform-runtime',
    ],
  };
  
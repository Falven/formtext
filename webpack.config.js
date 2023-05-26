const path = require('path');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      'react': 'react',
      'react-dom': 'react-dom',
      'react/jsx-runtime': 'react/jsx-runtime',
    },
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
    'react/jsx-runtime': 'react/jsx-runtime',
  },
  output: {
    filename: 'bundle.mjs',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: 'module',
    },
  },
  experiments: {
    outputModule: true,
  },
};

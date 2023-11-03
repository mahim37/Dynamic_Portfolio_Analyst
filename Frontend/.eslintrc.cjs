module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb',
  plugins: ['react', 'jsx-a11y',
    'import'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}', 'vite.config.js',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
};

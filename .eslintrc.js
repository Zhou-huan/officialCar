module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'prod' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'prod' ? 'error' : 'off',
    'prefer-const': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }, 
  globals: {
    'AMap': false
  }
}

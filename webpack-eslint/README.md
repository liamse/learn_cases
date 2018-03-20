## ESLint

As wikipedia refere, A linter or lint refers to tools that analyze source code to flag programming errors, bugs, stylistic errors, and suspicious constructs. 

### Requirement Modules

```js
    "eslint": "^3.15.0",
    "eslint-config-xo-react": "^0.10.0",
    "eslint-config-xo-space": "^0.15.0",
    "eslint-loader": "^2.0.0",
    "eslint-plugin-babel": "^4.1.2",
    "eslint-plugin-react": "^6.10.0",
    "babel-eslint": "^8.2.2",
```

### Webpack Configuration

```js
    {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre'
    },
```
### package.json

```json
{
  "dependencies": { ... },
  "eslintConfig": {
    "root": true,
    "extends": [
      "xo-react/space",
      "xo-space/esnext"
    ],
    "parser": "babel-eslint"
  }
}
```

### Jest

How to use `facebook jest` to test through webpack.
[Facebook](https://facebook.github.io/jest/docs/en/webpack.html) wrote a documnet about how to use Jest with Webpack.

### Requirement Modules

```json
    "jest": "^22.4.3",
    "babel-jest": "^22.4.3",
    "eslint-plugin-jest": "^21.15.0",

```

### Webpack Configuration

```json
"scripts": {
    "test": "jest"
}

```

### eslint configuration

```json
  "eslintConfig": {
    "root": true,
    "plugins": [
      "jest"
    ],
    "env": {
      "browser": true,
      "node": true,
      "jest/globals": true
    },
    "extends": [
      "xo-react/space",
      "xo-space/esnext"
    ],
    "rules": {
      "indent": [
        "error",
        4
      ],
      "semi": [
        "error",
        "never"
      ]
    },
    "parser": "babel-eslint"
  }
 ```

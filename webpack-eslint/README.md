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

### How to change tab 2 space in VSCode

`eslint` show indention errors. Most of my lint errors is about semiclones and indention. `eslint` use 2 space indetntion, but VSCode default spaces for each tab is 4. As I used to write python I prefere 4 space for each tab. I have then two way to solve this problem. First, change VSCode spaces setting and convert all my files. Second, change `eslint` this configuration.

To change VSCode, press `Shift+Ctrl+P` or in `View->Command Palette...` and search about `Preference: Open User Settings` and add following key-value:

```json
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
```

In left-bottom corner of VSCode you see `Spaces:4` on click on it a drop-down menu shows. select `indent Using Spaces` and select `2`.

And restart VSCode.

To change `eslint`, we need to override a role in `eslintconfig`. This can happen in `packhage.json` or `.eslintconf` file.

```json
{
  "eslintConfig": {
    "root": true,
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
}
```


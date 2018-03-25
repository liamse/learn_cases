# webpack-dev-server

## Requirement Modules

```json
    "webpack-dev-server": "^2.9.1",

```

### Webpack Configuration

`webpack-dev-serve` has error with old workbox options. It raise follwoing error. we need to change it.

```text
Error: One of the glob patterns doesn't match any files. Please remove or fix the following: {
  "globDirectory": "/Users/esmaeil/Desktop/ss/liamse/dist",
  "globPattern": "**/*.{html,js,css}",
  "globIgnores": [
    "node_modules/**/*",
    "workbox-sw.prod.v2.1.3.js",
    "sw.js"
  ]
}
```

To solve, change workbox options to this. For more information use [workbox webpack plugins](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin) website.

```js
    new WorkboxPlugin({
        globDirectory: './dist',
        globPatterns: ['./*.{js,png,html,css}'],
        swDest: 'dist/sw.js'
    }),
```

### package.json

```json
    "scripts" : {
        "start:dev": "webpack-dev-server --config conf/webpack.config.js",
    }
```

### HTTPS

To find `devServer` (webpack-dev-server) options, webpack wrote good [documentation](https://webpack.js.org/configuration/dev-server/#devserver).
One of options is `https`. It uses NODE.js HTTPS.
## TypeScript
### Requirement Modules
```js
    "ts-loader": "^3.5.0",
    "typescript": "^2.7.2",
```
### TypeScript Config
create a file name `tsconfig.json`.
```js
{
    "compilerOptions": {
        "outDir": "./dist/",
        "sourceMap": true, //Now we need to tell webpack to extract these source maps and into our final bundle with `devtool: 'inline-source-map'`
        "noImplicitAny": true,
        "module": "commonjs",
        "target": "es5",
        "jsx": "react",
        "allowJs": true
        },
    "include": [
        "./src/**/*"
    ]
}

```
### Webpack Configuration
```js
devtool: 'inline-source-map', // it is required for source map on TypeScript 
resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
},

module: {
    rules: [
        {
            test: /\.(tsx|ts)?$/,
            use: [{
                loader: 'ts-loader',
            }],
            exclude: /node_modules/
        },
    ]
}
```

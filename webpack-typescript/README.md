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
                options: {
                    configFile: 'tsconfig.json'
                }
            }],
            exclude: /node_modules/
        },
    ]
}
```

In `options.configFile` we can assign `tsconfig.json` file location. As default it search root of module. It can get absolute path or relative path. We prefere full path.

### Errors

- TS18002
  - It happen when `tscofig.json` file is not find. This means path to `tsconfig.json` at `ts-loader` does not set correctly.

### What is `declare` in TypeScript

The declare keyword is used for ambient declarations where you want to define a variable that may not have originated from a TypeScript file. [Gil Fink's blog](http://blogs.microsoft.co.il/gilf/2013/07/22/quick-tip-typescript-declare-keyword/)

```js
declare var myLibrary;
```

The type that the TypeScript runtime will give to myLibrary variable is the any type. The problem here is that you won’t have Intellisense for that variable in design time but you will be able to use the library in your code. Another option to have the same behavior without using the declare keyword is just using a variable with the any type:

```js
    var myLibrary: any;
```


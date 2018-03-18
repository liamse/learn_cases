## Webpack configuration

### Required Modules
Your `package.json` must have following packages to this configuration work properly. 

`webpack` package version is important, if you install version `4.X.X` some of these packages don't support it yet.

```js
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.3",
    "babel-preset-env": "^1.6.1",
    "babel-preset-es2015": "^6.24.1",
    "clean-webpack-plugin": "^0.1.18",
    "css-loader": "^0.28.10",
    "eslint-loader": "^2.0.0",
    "extract-text-webpack-plugin": "^3.0.2",
    "glob": "^7.1.2",
    "html-webpack-plugin": "^3.0.6",
    "node-sass": "^4.7.2",
    "path": "^0.12.7",
    "postcss-loader": "^2.1.1",
    "purify-css": "^1.2.5",
    "purifycss-webpack": "^0.7.0",
    "sass-loader": "^6.0.7",
    "style-loader": "^0.20.2",
    "webpack": "^3.1.0",
    "webpack-cli": "^2.0.10",
```

This configuration need to have following folder structure:

```text
YOUR_MODULE_ROOT
    |- src
       |- css
          |- `sass` or `scss` files
       |- index.html (use as Template for HtmlWebpackPlugin)
       |- app.js
```

`dist/` folder is made like this:

```text
YOUR_MODULE_ROOT
    |- dist
        |- css
            |- style.[chunkhash].css
            |- style.[chunkhash].css.map
        |-app.[chunkhash].js
        |-app.[chunkhash].js.map
        index.html
```

### HtmlWebpackPlugin

HtmlWebpackPlugin create the dist/index.html file based on src/index.html template. It links `stylesheets` and `scripts` automatically. As default it `inject` css files in `<head>` and `<script>`s in body. We can specify to inject them in `<head>`.

| Name | Type | Default | Description|
|:--:|:--:|:-----:|:----------|
|**[`inject`](#)**|`{Boolean\|String}`|`true`|`true \|\| 'head' \|\| 'body' \|\| false` Inject all assets into the given `template` or `templateContent`. When passing `true` or `'body'` all javascript resources will be placed at the bottom of the body element. `'head'` will place the scripts in the head element|

```js
new HtmlWebpackPlugin({  // Also generate a test.html
    template: path.join(process.cwd(), 'src/index.html'),
    inject: 'body',
}),
```

`inject : 'head'` run script before DOM completed. This make problem when you want to change DOM with your script. This is happen for me when I want to `render` react component into a `div`.

#### html-minifier

`HtmlWebpackPlugin` use [`html-minifier`](https://github.com/kangax/html-minifier) to minify HTML. To set properties of `html-minifier`, `HtmlWebpackPlugin` get an object in its `minify` property.

```js
new HtmlWebpackPlugin({  // Also generate a test.html
    template: path.join(process.cwd(), 'src/index.html'),
    inject: 'body',
    minify: {
        removeAttributeQuotes: true, //this is not good idea
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true, // This is not necessary because we minify it by PurifyCSS Plugin
        removeComments: true, //this is useful. I write a lot of comments that don't want to upload on websites. Like names, dates, and somethings that help me to remember why I wrote this code, like an order number, or email that I receive.
        removeEmptyAttributes: true, // this is not good idea, sometimes we need it.
    },
}),
```

To use it only in Production mode:

```js
new HtmlWebpackPlugin({  // Also generate a test.html
    template: path.join(process.cwd(), 'src/index.html'),
    inject: 'body',
    minify: !inProudction ? false : {
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        removeComments: true,
    },
}),
```

### webpack.config.js

```js
const path = require('path');
const webpack =  require('webpack');
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const inProduction = (process.env.NODE_ENV === 'production');

module.exports = {
    //webpack has a four major part: entry, output, module, and plugins
    entry: {
            app: './src/app.js', 
    },
    output: {
        path: path.join(process.cwd(), 'dist'),
        filename: '[name].[chunkhash].js',
        sourceMapFilename: '[file].map',
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader", options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "sass-loader", options: {
                            sourceMap: true
                        }
                    }],
                    fallback: 'style-loader',
                }),
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader" 
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: path.join(process.cwd()),
            verbos: true,
            dry: false,
        }),
        new ExtractTextPlugin('css/style.[chunkhash].css'),
        
        new HtmlWebpackPlugin({  // Also generate a test.html
            template: path.join(process.cwd(), 'src/index.html'),
            minify: !inProduction ? false : {
                collapseWhitespace: true,
                html5: true,
                minifyCSS: true,
                removeComments: true,
            },
            // filename: 'index.html',
            // inject: 'head'
            
        }),

    ],
    devtool: 'source-map',
};
//This part load only when NODE_ENV equal to `production`
if (inProduction){
    //uglify, in other means minify the javascript files.
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
    module.exports.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true
            //if use PurifyCSSPlugin this is ignored, you must write minimize: true after `paths`
        })
    );
    module.exports.plugins.push(
        // Make sure this is after ExtractTextPlugin!
        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            //glob.sync create a list of fiels recursively
            paths: glob.sync(path.join(__dirname, 'index.html')),

            minimize: inProduction,
        }))
    

}
```
## .babelrc
```js
{
    "presets": [
        "env"
    ]
}
```
### How to use it
In `package.json` add following scripts:
```
scripts: [
    "webpack": "node_modules/.bin/webpack --config webpack.config.js ",
    "prod:webpack": "NODE_ENV=production node_modules/.bin/webpack --config webpack.config.js",
    ]
```
To build in development mode, run `npm run webpack` and to run production mode run `npm run prod:webpack`.



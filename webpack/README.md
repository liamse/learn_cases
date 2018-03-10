## webpack configuration

Required modules to following configuration work is: 
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
```
This configuration need to have following folder structure:
```
YOUR_MODULE_ROOT
    |- src
       |- css
          |- `sass` or `scss` files
       |- index.html (use as Template for HtmlWebpackPlugin)
       |- app.js
```

`dist/` folder is made like this:
```
YOUR_MODULE_ROOT
    |- dist
        |- css
            |- style.[chunkhash].css
            |- style.[chunkhash].css.map
        |-app.[chunkhash].js
        |-app.[chunkhash].js.map
        index.html
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
            template: path.join(process.cwd(), 'src/index.html')
        }),

    ],
    devtool: 'source-map',
};
//add this when we webpack in production mode
if (inProduction){
    //uglify, in other means minify the javascript files.
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
    module.exports.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true
            //if use PurifyCSSPlugin this is ignore, you must write minimize: true after paths
        })
    );
    module.exports.plugins.push(
        // Make sure this is after ExtractTextPlugin!
        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync(path.join(__dirname, 'index.html')),
            //glob.sync create a list of fiels recursively
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
### How to run this configuration
In `package.json` add following scripts:
```
scripts: [
    "webpack": "node_modules/.bin/webpack --config webpack.config.js ",
    "prod:webpack": "NODE_ENV=production node_modules/.bin/webpack --config webpack.config.js",
    ]
```
To build in development mode, run `npm run webpack` and to run production mode run `npm run prod:webpack`.



const path = require('path');
const webpack = require('webpack');
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
                use: ['style-loader', 'css-loader']
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
if (inProduction) {
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
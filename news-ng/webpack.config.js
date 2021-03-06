var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var autoprefixer = require('autoprefixer')({ browsers: ['last 4 versions'] });

var path = require('path');

var output = "./bin";

module.exports = {
    devtool: 'source-map',
    context: path.join(__dirname, "src/app"),
    entry: {
        'app': './ts/main.ts',
        'style': './scss/main.scss',
    },
    output: {
        path: output,
        filename: "[hash].[name].js"
    },
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    preLoaders: [
        {
            test: /\.(js|css)$/,
            loader: 'source-map-loader',
            exclude: []
        },
        {
            test: /\.ts$/,
            loader: 'tslint'
        }
    ],
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts',
                query: { configFileName: 'tsconfig.json' }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss!resolve-url!sass-loader?sourceMap')
            }/*,
            {
                test: /\.(css|svg|png|jpg|jpeg|gif)$/,
                loader: 'file?name=[path][name].[ext]'
            }*/
        ]
    },
    plugins: [
        new ExtractTextPlugin('[hash].[name].css', { allChunks: true }),
        new CleanWebpackPlugin([output]),
        new CopyWebpackPlugin([
            //{ from: 'images', to: "images" },
            { from: "../../../data/*.json", to: 'news-ng/bin/data' },
            { from: "../../../data/images/*.jpg", to: 'bin/data/images' },
            { from: "../sn/*.png", to: 'sn' },
            { from: '**/*.html', to: "app" },
            { from: '../robots.txt' },
            { from: '../sitemap.txt' },
            { from: '../logo.png' },
            { from: '../favicon.ico' },
            { from: '../sc.jpg' },
            { from: '../hs.jpg' },
            { from: '../st.jpg' },
            { from: '../bf.jpg' },
            { from: "../../node_modules/core-js/client/shim.min.js", to: "libs" },
            { from: "../../node_modules/zone.js/dist/zone.min.js", to: "libs" },
            { from: "../../node_modules/reflect-metadata/Reflect.js", to: "libs" }
        ]),
        new HtmlWebpackPlugin({
            template: '../index.html',
            chunksSortMode: 'dependency'
        })
	],

    postcss: function () {
        return {
            defaults: [autoprefixer]
        };
    }
}
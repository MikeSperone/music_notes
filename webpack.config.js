const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const environment = process.env.NODE_ENV;

module.exports = {
    entry: './src/index.js',
    devServer: {
        contentBase: './dist',
    },
    mode: environment,
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: true
                    }
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: true
                    }
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: environment === 'development',
                        },
                    },
                    // 'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            // Prefer `dart-sass`
                            implementation: require('sass'),
                        },
                    },
                ]
            },
        ]
    },
    resolve: {
        alias: {
            "components": path.resolve(__dirname, 'src/components/'),
            // Must be below test-utils
        },
        extensions: [ '.tsx', '.ts', '.js', '.jsx' ],
        modules: [
        'node_modules',
        'src'
    ],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
}

const path = require('path');

module.exports = {
    entry: './src/index.js',
    devServer: {
         contentBase: './dist',
    },
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

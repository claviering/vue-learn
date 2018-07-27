var htmlwp = require('html-webpack-plugin');

module.exports = {
    entry:__dirname+'/src/main.js',
    output:{
        path:__dirname + '/dist',
        filename:'build.js'
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=40000'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_nodules/
            }
        ]
    },
    plugins:[
        new htmlwp({
            title: 'tittle',
            filename: 'index.html',
            template: 'index1.html'
        })
    ]
};
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
            }
        ]
    }
};
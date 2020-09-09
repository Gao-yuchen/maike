module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://39.96.74.104:8079',
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    }
}
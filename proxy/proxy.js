const proxyTable = {
        context:[
            //首页
            '/hs/v3/channel/418',
            //瀑布流请求
            '/rock/book/recommend',
            //搜索页面
            '/store/v0/ad',
            //banner
            '/store/v0/fiction/list/',
            //频道更多
            '/hs/v3/channel/',
            //更多专题
            '/store/v0/ad/persistent',
            ////分类
            '/hs/v0/android/store/category',
            //排行
            '/store/v0/ad/ranks',
            //详情
            '/hs/v0/android/fiction/book/'
        ],
        options: {
            target: 'http://dushu.xiaomi.com/',
            changeOrigin: true
        }
    }
module.exports = proxyTable 
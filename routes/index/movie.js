var router = require('koa-router')();
const install = require('superagent-charset');
const request = require('superagent');
const cheerio = require('cheerio');
const koaproxy = require('koa2-pixie-proxy')
import { chinese2Gb2312 } from '../../assets/utils'

let config = {
    searchUrl: 'http://s.imp4la.com/s.asp?w='
}

//注入能够解码的superagent
const superagent = install(request);
//获取信息
var getInfo = function(url) {
    return new Promise((resolve, reject) => {
        superagent.get(url).charset('gb2312').end(function(err, res) {
            if (err) {
                reject(err);
            }
            var $ = cheerio.load(res.text, { decodeEntities: false });
            resolve($);
        });
    })
};


router.post('/search', async function(ctx, next) {
    var keyword = ctx.request.body.key;
    var options = {
        url: config.searchUrl + chinese2Gb2312(keyword)
    };
    var movies = await getInfo(options.url)
        .then($ => {
            var movieList = [];
            var movieDom = $('.movielist li');
            movieDom.each((i, o) => {
                movieList.push({
                    href: $(o).find('a').attr('href'),
                    score: $(o).find('.pRightBottom info').html(),
                    cover: $(o).find('img').attr('src'),
                    year: $(o).find('.pLeftTop info').html()
                })
            })
            return movieList;
        })
        .catch(err => { console.log(err) })
    ctx.body = movies;
})

module.exports = router;
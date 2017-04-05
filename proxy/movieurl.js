const request = require('koa-request');
const prefix = 'http://www.idyjy.com/';
const config = {
    search: prefix + "/s.asp?w="
}
getMovieDownRrl = {
    search: function(movie) {
        return new Promise((resolve, reject) => {
            request(config.search + movie)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err)
                });
        })
    }
};


module.exports = {

}
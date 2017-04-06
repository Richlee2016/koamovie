const iconv = require('iconv-lite');
const BufferHelper = require('bufferhelper');

const markReg = (str) => /\"(.*)\"/g.exec(str)[1];
const encodeGbk = (str) => {
    var buffer = new Buffer(str);
    return iconv.decode(buffer, 'GBK');
}

let chinese2Gb2312 = function(data) {
    let pad = function(number, length, pos) {
        var str = "%" + number;
        while (str.length < length) {
            //向右边补0
            if ("r" == pos) {
                str = str + "0";
            } else {
                str = "0" + str;
            }
        }
        return str;
    }

    let toHex = function(chr, padLen) {
        if (null == padLen) {
            padLen = 2;
        }
        return pad(chr.toString(16), padLen);
    }

    var gb2312 = iconv.encode(data.toString('UCS2'), 'GB2312');
    var gb2312Hex = "";
    for (var i = 0; i < gb2312.length; ++i) {
        gb2312Hex += toHex(gb2312[i]);
    }
    return gb2312Hex.toUpperCase();
}


export { markReg, encodeGbk, chinese2Gb2312 }
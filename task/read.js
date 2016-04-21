//var url = 'http://top.baidu.com/category?c=10&fr=topindex';

var request = require('request');//拉取网页内容
var cheerio = require('cheerio');//实现jquery功能
var iconv = require('iconv-lite');//把GBK转成UTF8
/**
 * res 响应对象
 * body 响应体
 */
exports.category = function(url,callback){
	request({url:url,encoding:null},function(err,res,body){
		if(err){
			return console.error(err);
		}
		//把gbk编码的buffer转成utf8编码的字符串
		body = iconv.decode(body,'gbk');
		//根据响应体转成DOM对象
		var $ = cheerio.load(body);
		var items = [];
		//找到所有的分类的A标签并进行转换
		$('.hd .title a').each(function(){
			var $me = $(this);
			//<a href="http://top.baidu.com/buzz?b=353&amp;c=10&amp;fr=topcategory_c10">玄幻奇幻</a>
			var item = {
				name:$me.text().trim(),
				url:$me.attr('href')
			}
			var params = regParams(item.url);
			item.id = params.b;
			items.push(item);
			//console.log(item);//{ name: '全部', url: './buzz?b=7&c=10', id: '7' }
			//console.log(params);//{ b: '7', c: '10' }
		});
		callback(null,items);
	});
}

/*
    var str = './buzz?b=353&c=10';
	 var reg = /(([^?&=]*)=([^?&=]*))/g;
	 console.log(str.match(reg))
	 结果： ["b=353", "c=10"]
 */
function regParams(url) {
	var obj = {};
	var reg = /([^?&=]*)=([^?&=]*)/g;
	url.replace(reg, function (src,$1, $2)  {
		obj[$1]=$2;
	})
	return obj
}


exports.article = function(url,cid,callback){
	request({url:url,encoding:null},function(err,res,body){
		if(err){
			return console.error(err);
		}
		//把gbk编码的buffer转成utf8编码的字符串
		body = iconv.decode(body,'gbk');
		//根据响应体转成DOM对象
		var $ = cheerio.load(body);
		var items = [];
		//找到所有的分类的A标签并进行转换
		$('.keyword a').each(function(){
			var $me = $(this);
			var item = {
				name:$me.text().trim(),
				url:$me.attr('href'),
				cid:cid
			}
			if(item.name != 'search'){
				items.push(item);
			}
		});
		callback(null,items);
	});
}
const domain = "https://uniapp-interface.herokuapp.com/";

const host = "https://api.huzhihui.org.cn/";


const interfaces = {
	// 获取首页数据
	getMallData: domain + "api/profiles/mall_list",
	// 获取分类数据
	getCategory: domain + "api/profiles/category",
	// 获取商品列表数据
	getGoodsList: domain + 'api/profiles/goodslist',
	// 商品详情信息
	getGoods: domain + "api/profiles/goods",
	//获取IP
	GET_IP: `${host}/ip`,
	GET_SEARCH_SUGGEST: `${host}search/suggest`,
	GET_SONG_URL: `${host}song/url`,
	

}


module.exports = interfaces;

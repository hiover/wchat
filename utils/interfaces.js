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
GET_IP: `${host}ip`,
//搜索
GET_SEARCH_SUGGEST: `${host}search/suggest`,
//获取播放链接
GET_SONG_URL: `${host}song/url`,
// 获取图片
GET_IMAGE_STATIC: `${host}images_pub/`,
// 获取视频
GET_VIDEO_STATIC: `${host}video_pub/`,
// 获取诗句
GET_DOC: `${host}doc`,
// 获取歌曲信息
GET_MUSIC_DETAIL: `${host}song/detail`,
// 获取热歌排行
// "0": 云音乐新歌榜,
// "1": 云音乐热歌榜,
// "2": 网易原创歌曲榜,
// "3": 云音乐飙升榜,
// "4": 云音乐电音榜,
// "5": UK排行榜周榜,
// "6": 美国Billboard周榜
// "7": KTV嗨榜,// "8": iTunes榜,
// "9": Hit FM Top榜,
// "10": 日本Oricon周榜
// "11": 韩国Melon排行榜周榜,
// "12": 韩国Mnet排行榜周榜,
// "13": 韩国Melon原声周榜,
// "14": 中国TOP排行榜(港台榜),
// "15": 中国TOP排行榜(内地榜)
// "16": 香港电台中文歌曲龙虎榜,
// "17": 华语金曲榜,
// "18": 中国嘻哈榜,
// "19": 法国 NRJ EuroHot 30周榜,
// "20": 台湾Hito排行榜,
// "21": Beatport全球电子舞曲榜,
// "22": 云音乐ACG音乐榜,
// "23": 云音乐说唱榜
// "24": 云音乐古典音乐榜
// "25": 云音乐电音榜
// "26": 抖音排行榜
// "27": 新声榜
// "28": 云音乐韩语榜
// "29": 英国Q杂志中文版周榜
// "30": 电竞音乐榜
// "31": 云音乐欧美热歌榜
// "32": 云音乐欧美新歌榜
// "33": 说唱TOP榜
GET_TOP_LIST: `${host}top/list?idx=1`,
GET_RECOMMEND_SONGS: `${host}recommend/songs`,
GET_MONENTS_DETAIL: `${host}monents`,

}


module.exports = interfaces;

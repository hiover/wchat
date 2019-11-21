<template>
	<view class="app">
		<view class="nav" :style="{opacity:opacity }">
			<text class="icon back">&#xe6ed;</text>
			<text class="title">温成说</text>
		</view>
		<view class="header">
			<view class="img-box">
				<image class="img" :lazy-load="true" :src="header_image" mode="scaleToFill" @tap="handleChangeCaver" />
			</view>
			<text class="nickname">{{user.userInfo&&user.userInfo.nickName}}</text>
			<image class="avatar" :lazy-load="true" :src="user.userInfo&&user.userInfo.avatarUrl" mode=""></image>
			<text class="icon refrash" :style="[refrash_styles]">&#xe8b4;</text>
		</view>
		<view class="con">
			<button v-if="!hasLogin" type="primary" open-type="getUserInfo" @getuserinfo="handleGetUserInfo">获取用户信息</button>

			<userContent v-for="(item,index) in monents" :key="index" :useravatar="item.useravatar" :nickname="item.nickname"
			 :copywriting="item.copywriting" :signature="item.signature" :monents="item.monents" @on-commit="handleCommit" />
			<view class="loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		</view>
		<!-- <input :style="{display:showcommit?'block':'none'}" class="input" confirm-type="发送"  placeholder=" " :focus="showcommit" placeholder="" @blur="showcommit=false" /> -->
		<view class="commit" :style="{display:showcommit?'flex':'none'}">
			<input :style="{display:showcommit?'block':'none'}" class="input" confirm-type="发送" :placeholder="` `" :focus="showcommit"
			 placeholder="" @blur="showcommit=false" />
			<text class="icon face">&#xe71c;</text>
		</view>

	</view>
</template>

<script>
	import userContent from '@/pages/home/components/content.vue';
	import api from '@/utils/interfaces.js';
	import minix from '@/utils/minix';

	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {

		data() {
			return {
				title: '下拉刷新 + 加载更多',
				data: [],
				loadMoreText: "加载中...",
				showLoadMore: false,
				max: 0,

				header_image: 'https://api.huzhihui.org.cn/images_pub/pub_124.jpg',
				showcommit: false,
				top: null,
				opacity: 0,
				refrash_styles: {},
				titleBg: 'rgba(255,255,255,0)',

				user: {
					// userInfo: {
					// 	avatarUrl: this.ganImage(),
					// 	nickName: "TigerZH",
					// }

				},
				appear: false,
				monents: [{
						useravatar: this.ganImage(),
						nickname: "王力宏",
						copywriting: "FPX牛批！！！！",
						signature: '无提',
						monents: {
							type: 'share',
							list: [{
								id: '',
								url: this.ganImage(),
								copywriting: '美国通过香港人权法案！！！'
							}]
						}
					},
					// {
					// 	useravatar: this.ganImage(),
					// 	nickname: "TigerZH",
					// 	copywriting: "快吃不起水果了🍊🍎🍞🥛",
					// 	monents: {
					// 		type: 'vedio',
					// 		list: [{
					// 			id: 'vedio123',
					// 			url: `${api.GET_VIDEO_STATIC}pub_1.mp4`
					// 		}]
					// 	}
					// },
					{
						useravatar: this.ganImage(),
						nickname: "周杰伦",
						copywriting: "我没胖！！！",
						signature: '也许我不是你的小可爱',
						monents: {
							type: 'image',
							list: [{
								id: 'pub_300',
								url: this.ganImage()
							}, {
								id: 'pub_301',
								url: this.ganImage()
							}, {
								id: 'pub_302',
								url: this.ganImage()
							}, {
								id: 'pub_303',
								url: this.ganImage()
							}, {
								id: 'pub_304',
								url: this.ganImage()
							}, {
								id: 'pub_305',
								url: this.ganImage()
							}, {
								id: 'pub_306',
								url: this.ganImage()
							}, {
								id: 'pub_307',
								url: this.ganImage()
							}, {
								id: 'pub_308',
								url: this.ganImage()
							}, ]
						}
					}, {
						useravatar: this.ganImage(),
						nickname: "王一迪",
						copywriting: "快吃不起水果了🍊🍎🍞🥛",
						signature: '原谅我不完美',
						monents: {
							type: 'image',
							list: [{
								id: 'pub_124',
								url: this.ganImage()
							}]
						}
					}, {
						useravatar: this.ganImage(),
						nickname: "姜丽起",
						signature: '？',
						copywriting: "王者dd",
						monents: {
							type: 'image',
							list: [{
								id: 'pub_125',
								url: this.ganImage()
							}, {
								id: 'pub_126',
								url: this.ganImage()
							}, {
								id: 'pub_127',
								url: this.ganImage()
							}, {
								id: 'pub_128',
								url: this.ganImage()
							}]
						}
					},


				]

			}
		},
		mixins: [minix],
		computed: {
			...mapState({
				loginProvider: state => state.loginProvider,
				hasLogin: state => state.hasLogin,

			})
		},
		components: {
			userContent
		},
		onLoad() {
			this.max = 0;
			this.loadMoreText = "加载更多";
			this.showLoadMore = false;
			this.header_image = this.ganImage();
			this.handleGetUserInfo();


		},
		onReachBottom() {
			this.showLoadMore = true;
			this.monents.push(...this.monents)
		},
		onPageScroll: function(e) {
			// this.top = Math.sqrt(e.scrollTop);
			console.log(e);
			this.top = e.scrollTop;
			const term = e.scrollTop / 300;
			if (term > 1) {
				this.opacity = 1;



			} else {
				this.opacity = term
			}
			uni.setNavigationBarColor({
				frontColor: this.opacity === 1 ? "#000000" : "#ffffff",
				backgroundColor: this.opacity === 1 ? "#F8F8F8" : "#f8f8f8"
			})

			//震动一下
			if (e.scrollTop === -100) {
				setTimeout(() => {
					uni.vibrateShort({
						success: function() {
							console.log('success');
						}
					});
				})

			}
			if (e.scrollTop < -100) {
				this.refrash_styles = {
					top: '100px',
					transform: `rotate(${Math.sqrt(e.scrollTop)*360}deg)`,
				};
				this.animation = uni.createAnimation({
					transformOrigin: "50% 50%",
					duration: 1000,
					timingFunction: "ease",
					delay: 0
				})

			} else {
				this.refrash_styles = {
					top: '-100%',
					transform: 'rotate(360deg)',
				}
			}

			// this.titleBg = 'rgba(255,255,255,' + e.scrollTop / 300 + ')';
		},
		methods: {
			...mapMutations(['login', 'asyncUserInfo']),

			handleCommit() {
				console.log('评论');
				this.showcommit = true;

			},
			handleGetUserInfo() {
				uni.login({
					provider: 'weixin',
					success: (loginRes) => {
						console.log(loginRes);
						this.login("weixin");
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: (infoRes) => {
								console.log(infoRes);
								this.user = infoRes;
								this.asyncUserInfo(infoRes)
							},
							complete(infoRes) {
								console.log(infoRes);
							}
						});
					}
				});
			},
			handleChangeCaver() {
				const itemList = ['更换相册封面']
				uni.showActionSheet({
					itemList,
					success: (res) => {
						const course = itemList[res.tapIndex];
						console.log(course);
						uni.chooseImage({
							count: 1, //默认9
							sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
							sourceType: ['album'], //从相册选择
							success: (res) => {
								this.header_image = res.tempFilePaths[0];
								console.log(JSON.stringify(res.tempFilePaths));
							}
						});

					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},

			scrolltoupper(e) {
				console.log(e);
				uni.vibrateShort({
					success: function() {
						console.log('success');
					}
				});
			},
			onGotUserInfo(res) {}
		}
	}
</script>

<style lang="scss">
	page,
	.app {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
	}

	.nav {

		position: fixed;
		top: 0;
		padding-top: var(--status-bar-height);
		left: 0;
		background: $header;
		width: 100%;
		height: 115upx;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		z-index: 1;
		font-size: 30upx;

		.back {
			// font-size: 65upx;
			// position: absolute;
			// top: 100%;
			// left: 100%;
			display: none;
		}

		.title {
			font-weight: bold;
			font-size: 30upx;
			margin-bottom: 26upx;
		}
	}

	.header {
		width: 100%;
		height: 38%;
		position: relative;



		.refrash {
			position: absolute;
			top: -100%;
			left: 5%;
			font-size: 70upx;
			background-image: -webkit-gradient(linear, left 0, right 0, from(rgb(4, 94, 170)), to(rgb(1, 152, 216)));
			-webkit-background-clip: text;
			/*必需加前缀 -webkit- 才支持这个text值 */
			-webkit-text-fill-color: transparent;
			/*text-fill-color会覆盖color所定义的字体颜色： */
			transition: all .3s linear;
			transform: rotate(0deg);
		}

		.img-box {
			height: 100%;
			width: 100%;
			background-color: $mask;
			position: relative;

			.img {
				position: absolute;
				bottom: 0upx;
				left: 0upx;
				width: 100%;

			}

			// position: absolute;
			// bottom: -300upx;
			// left: 0;
		}

		.nickname {
			position: absolute;
			bottom: 10upx;
			color: #FFFFFF;
			right: 25%;
			font-weight: bold;
			font-size: 40upx;
		}

		.avatar {
			position: absolute;
			bottom: -7%;
			height: 130upx;
			width: 130upx;
			color: #FFFFFF;
			right: 5%;
			font-weight: 900;
			border-radius: 20upx;
		}


	}

	.commit {
		display: flex;
		background-color: $header;
		align-items: center;
		z-index: 2;
		position: fixed;
		bottom: 46upx;
		left: 0;
		width: 100%;
		padding: 10upx 13upx;

		.input {
			padding: 10upx 15upx;
			display: flex;
			flex: 1;
			margin: 3upx 5upx;
			background: #fff;
		}

		.face {
			margin: 0px 30upx;
			font-size: 50upx;

		}
	}


	.con {
		// margin-top: 38%;
		display: flex;
		flex-direction: column;
		margin: 12% 0 0 0;
		flex: 1;
	}

	.roate {
		animation: roate 1s linear infinite;
	}
</style>

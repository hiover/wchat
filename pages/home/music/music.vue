<template>
	<view class="page" :style="{'background-image':`url(${music.image})` }">
		<!-- 导航栏 -->
		<view class="header" :style="{'padding-top':statusBarHeight}">
			<navigator open-type="navigateBack" class="back"><text class="icon">&#xe6ed;</text></navigator>
			<text class="name">{{music.name}}</text>
		</view>

		<view class="music roate" :style="{'animation-play-state':state==='playing'?'running':'paused'}" ref="music">
			<view class="wave" :style="{'animation-play-state':state==='playing'?'running':'paused'}">

			</view>
			<!-- 播放圆盘 -->
			<!-- <view :animation="animation" class="music" ref="music"> -->
			<image @tap="handleTogglePlay" class="image" :src="music.image" mode="aspectFill">
				<text @tap="handleTogglePlay" v-if="state==='pause'" class="icon play">&#xe664;</text>
			</image>
		</view>
		<button class="about" open-type="getUserInfo" @getuserinfo="handleGetUserInfo" @tap="handleGetUserInfo">关于我</button>
	</view>
</template>

<script>
	const innerAudioContext = uni.getBackgroundAudioManager();

	import api from '@/utils/interfaces.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				state: '',

			}
		},
		onLoad() {
			// roateDom.style.webkitAnimationPlayState = 'running';

			// const key = 'MUSIC';
			// let musi c = uni.getStorageSync(key) || '{}';
			uni.setNavigationBarTitle({
				title: this.music.name
			});
			uni.setNavigationBarColor({
				frontColor: "#ff8344",
				backgroundColor: "#f8f8f8"
			})
			// debugger;
			// console.log(this.music);
			// console.log(JSON.parse(params));
			// this.init()
			this.setOptions()
		},
		onHide() {

		},
		computed: {

			...mapState({
				music: state => state.music.curr_music,
				statusBarHeight: state => state.statusBarHeight,
				user: state => state.statusBarHeight,
				haslogin: state => state.hasLogin,


			})
		},

		methods: {
			...mapMutations(['login', 'asyncMusic', 'asyncUserInfo']),
			handleGoHome() {
				uni.redirectTo({
					url: '../home',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			handleGetUserInfo() {
				if (this.haslogin) {
					this.handleGoHome();
					return
				}
				uni.login({
					provider: 'weixin',
					success: (loginRes) => {
						console.log(loginRes);
						this.login("weixin");
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: (infoRes) => {
								this.asyncUserInfo(infoRes);
								this.handleGoHome();

							},
							complete(infoRes) {
								console.log(infoRes);
							}
						});
					}
				});
			},
			play() {
				innerAudioContext.play()
			},
			pause() {
				innerAudioContext.pause()
			},
			handleTogglePlay() {
				if (innerAudioContext.paused) {
					this.play()
					this.state = 'playing';
				} else {
					this.pause();
					this.state = 'pause';
				}
			},
			setOptions() {
				const url = this.music.url;
				if (!url) return;
				innerAudioContext.autoplay = true;
				innerAudioContext.loop = true;
				innerAudioContext.src = url;
				innerAudioContext.coverImgUrl = this.music.image;
				innerAudioContext.title = this.music.name;
				const ar = this.music.artists.map(e => e.name).toString();
				innerAudioContext.singer = ar;

				innerAudioContext.onPlay(() => {
					console.log('开始播放');
					this.state = 'playing';
					// const bgAudioMannager = uni.getBackgroundAudioManager();
					// bgAudioMannager.title = this.music.name;
					// bgAudioMannager.singer = '暂无';
					// bgAudioMannager.coverImgUrl = this.music.image;
					// bgAudioMannager.src = url;
				});
				innerAudioContext.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				});
				innerAudioContext.onWaiting(() => {
					console.log('音频正在加载中...');
				})
				innerAudioContext.onPause(() => {
					this.state = 'pause';
				})
				innerAudioContext.onPrev(() => {
					this.state = '上一首';
				})
				innerAudioContext.onNext(() => {
					this.state = '下一首';
				})
				innerAudioContext.onEnded(() => {
					this.state = 'ended';
				})
			},

		}
	}
</script>

<style lang="scss">
	page,
	.page {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		object-fit: fill;
		// filter: brightness(80%);
		background-size: cover;
		object-fit: fill;
		background-color: #efefef;
		justify-content: center;
		align-items: center;
		background-position: center center;
		background-repeat: no-repeat;



	}

	.about {

		position: fixed;
		bottom: 50rpx;
		right: 37rpx;
		font-size: 24rpx;
		border-radius: 50rpx;
		font-weight: 350;
		box-shadow: 10rpx 10rpx #333;
		transition: all .3ms;
	}

	.about:active {
		box-shadow: none;
	}

	.header {
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: var(--status-bar-height);
		height: 44px;
		line-height: 44px;
		font-size: 16px;


		.back {
			position: absolute;
			left: 40rpx;
			top: calc(var(--status-bar-height)+40upx);
			color: #fff;
			font-size: 70rpx;
		}

		.name {
			color: #fff;
			font-size: 40rpx;
			width: 50%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			text-align: center;

		}
	}


	.music {
		border-radius: 50%;
		height: 600upx;
		width: 600upx;
		background-color: #000;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;

		.image {
			height: 400upx;
			width: 400upx;
			border-radius: 50%;
			z-index: 1;
			position: relative;



		}

		.play {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			color: #fff;
			font-size: 150upx;
			z-index: 2;

		}
	}

	.music::after {
		content: " ";
		border-radius: 50%;
		height: 600upx;
		width: 600upx;
		border: 30upx solid #fff;
		position: absolute;
		// background-color: #f00;
		left: 50%;
		top: 50%;
		z-index: 0;
		transform: translate(-50%, -50%);
		opacity: .48;
	}

	// .music::before {
	// 	content: " ";
	// 	border-radius: 50%;
	// 	height: 630upx;
	// 	width: 630upx;
	// 	border: 30upx solid #fff;
	// 	// background-color: #fff;
	// 	position: absolute;
	// 	left: 50%;
	// 	top: 50%;
	// 	z-index: 0;
	// 	transform: translate(-50%, -50%);
	// 	opacity: .5;
	// 	animation: wave 3s infinite linear;
	// 	-webkit-animation: wave 3s infinite linear;
	// }

	.wave {
		content: " ";
		border-radius: 50%;
		height: 630upx;
		width: 630upx;
		border: 30upx solid #fff;
		// background-color: #fff;
		position: absolute;
		left: 50%;
		top: 50%;
		z-index: 0;
		transform: translate(-50%, -50%);
		opacity: .5;
		animation: wave 3s infinite linear;
		-webkit-animation: wave 3s infinite linear;
	}

	.active:active {
		background-color: #f8f8f8;
	}


	.text-over {
		overflow: hidden; //超出一行文字自动隐藏
		text-overflow: ellipsis; //文字隐藏后添加省略号
		white-space: nowrap; //强制不换行
	}

	.roate {
		animation: circle 25s infinite linear;
		-webkit-animation: circle 25s infinite linear;
	}

	@keyframes wave {
		0% {
			opacity: 0.6;
			height: 630upx;
			width: 630upx;
			border: 30upx solid #fff;
		}

		30% {
			opacity: 0.4;
			height: 700upx;
			width: 700upx;
			border: 20upx solid #fff;
		}

		60% {
			opacity: 0.2;
			height: 770upx;
			width: 770upx;
			border: 10upx solid #fff;

		}

		90% {
			opacity: 0.1;
			height: 840upx;
			width: 840upx;
			border: 5upx solid #fff;
		}

		100% {
			opacity: 0.3;
			height: 630upx;
			width: 630upx;
			border: 30upx solid #fff;

		}
	}

	@keyframes circle {
		0% {
			transform: rotate(0deg);
		}

		50% {
			transform: rotate(180deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>

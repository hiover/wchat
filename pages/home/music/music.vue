<template>
	<view class="page" :style="{'background-image':music.curr_music.artists[0].img1v1Url}">
		<view class="music roate" ref="music">
			<image @tap="handleTogglePlay" class="image" :src="music.curr_music.artists[0].img1v1Url" mode="aspectFill"></image>
		</view>
	</view>
</template>

<script>
	const innerAudioContext = uni.createInnerAudioContext();
	import api from '@/utils/interfaces.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			// roateDom.style.webkitAnimationPlayState = 'running';

			// const key = 'MUSIC';
			// let musi c = uni.getStorageSync(key) || '{}';
			console.log(this.music);
			uni.setNavigationBarTitle({
				title: this.music.curr_music.name
			});
			uni.setNavigationBarColor({
				frontColor: "#ff8344",
				backgroundColor: "#f8f8f8"
			})
			// debugger;
			// console.log(JSON.parse(params));
			// this.init()
			this.setOptions()
		},
		computed: {

			...mapState({
				music: state => state.music,
			})
		},
		watch: {
			music: {
				deep: true,
				handleChange(params) {
					const roateDom = this.$refs.music;
					if (!params) return;
					if (!roateDom) return;
					if (params.state === 'playing') {
						roateDom.style.webkitAnimationPlayState = 'running';
					} else {
						roateDom.style.webkitAnimationPlayState = 'paused';
					}
				}
			}
		},
		methods: {

			...mapMutations(['asyncMusic']),
			play() {
				innerAudioContext.play()
			},
			pause() {
				innerAudioContext.pause()
			},
			handleTogglePlay() {
				console.log(innerAudioContext);
			},
			setOptions() {

				// innerAudioContext.autoplay = true;
				innerAudioContext.src = this.music.curr_music.url;
				innerAudioContext.loop = true;
				// 是否遵循系统静音开关，当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音，默认值 true
				innerAudioContext.obeyMuteSwitch = false;
				innerAudioContext.play();
				innerAudioContext.pause()
				innerAudioContext.onTimeUpdate = () => {
					this.currentTime = innerAudioContext.currentTime;
					this.duration = innerAudioContext.duration;

				}
				innerAudioContext.onPlay(() => {

					console.log('开始播放');
					// const music = JSON.parse(JSON.stringify(this.music))
					// const his_list = music.his_list || [];
					// his_list.push(this.value.toString());
					// music.his_list = his_list;
					this.currentTime = innerAudioContext.currentTime;
					this.duration = innerAudioContext.duration;
				});
				innerAudioContext.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				});
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
		background-size: 100% 100%;
		object-fit: fill;
		filter: brightness(80%);
		background-size: 100% 100%;
		object-fit: fill;
		background-color: #efefef;
		justify-content: center;
		align-items: center;

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
			height: 350upx;
			width: 350upx;
			border-radius: 50%;
			z-index: 1;

		}
	}

	.music::after {
		content: " ";
		border-radius: 50%;
		height: 600upx;
		width: 600upx;
		border: 30upx solid #f00;
		position: absolute;
		// background-color: #f00;
		left: 50%;
		top: 50%;
		z-index: 0;
		transform: translate(-50%, -50%);


	}

	.music::before {
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

	@keyframes circle {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>

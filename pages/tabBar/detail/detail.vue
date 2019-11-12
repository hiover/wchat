<template>
	<view class="page">
		<input class="search" type="text" v-model="value" @input="handleInput" />

		<view @tap="handlePlay(item)" class="lie" v-for="item in songs" :key="item.id">
			<view class="">
				{{item.name}}
			</view>
			<view class="" v-for="a in item.artists" :key="a.id">
				{{a.name}}
			</view>
		</view>



	</view>
</template>

<script>
	import api from '../../../utils/interfaces.js'

	export default {
		data() {
			return {
				value: '',
				url: "http://m7.music.126.net/20191111171646/5199bc023c2148f2c5c7b24d948cba12/ymusic/510f/5659/510b/fe1f2bda3ca3bd68ad48fa2b82f1d7a1.mp3",
				duration: '00:00',
				currentTime: '00:00',
				songs: [],
				innerAudioContext: null,

			}
		},
		onLoad() {
			// this.init()
		},
		methods: {
			init() {
				if (this.innerAudioContext) this.innerAudioContext.stop();
				this.innerAudioContext = uni.createInnerAudioContext();
				const innerAudioContext = this.innerAudioContext;
				// innerAudioContext.autoplay = true;
				innerAudioContext.src = this.url;
				innerAudioContext.loop = true;
				// 是否遵循系统静音开关，当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音，默认值 true
				innerAudioContext.obeyMuteSwitch = false;
				innerAudioContext.play()
				innerAudioContext.onTimeUpdate = () => {
					this.currentTime = innerAudioContext.currentTime;
					this.duration = innerAudioContext.duration;

				}
				innerAudioContext.onPlay(() => {
					console.log('开始播放');
					this.currentTime = innerAudioContext.currentTime;
					this.duration = innerAudioContext.duration;
				});
				innerAudioContext.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				});
			},
			handlePlay(item) {

				this.request({
					url: api.GET_SONG_URL,
					data: {
						id: item.id
					},
					success: res => {
						this.url = res.body.data[0].url;
						this.init()
					},

				});
			},
			handleInput({
				target: {
					value
				}
			}) {
				if (!value) return;
				this.request({
					url: api.GET_SEARCH_SUGGEST,
					method: 'GET',
					data: {
						keywords: value.toString()
					},
					success: res => {
						if (res.body.result && res.body.result.songs) this.songs = res.body.result.songs;

					},
				});

			}
		}
	}
</script>

<style lang="scss">
	.page {
		display: flex;
		margin: 10px;
		flex-direction: column;
	}

	.search {
		// width: 100%;
		// padding: 10upx;
		border: 1px #efefef solid;
		border-radius: 10px;
		padding: 10px;
		display: flex;
		flex: 1;
	}

	.lie {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 20upx;
		border-bottom: 1px solid #efefef;

	}
</style>

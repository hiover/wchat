<template>
	<view class="page">
		<view class="search">
			<text class="icon">&#xe8b9;</text>
			<input class="input text-over" focus type="text" v-model="value" @input="handleInput" />
			<text class="icon clear" v-if="value!==''" @tap.stop.prevent="handleClear()">&#xe615;</text>
		</view>

		<view class=" lie active" @tap="handlePlay(item)" v-for="item in songs" :key="item.id">
			<view class="name text-over">
				{{item.name}}
			</view>
			<view class="artists text-over">
				<text style="margin-right: 10px;" v-for="a in item.artists" :key="a.id">{{a.name}}</text>

			</view>
			<text class="icon play">&#xe664;</text>
		</view>
		<view class="history" v-if="music.his_list.length">
			<view class="title">
				<text style="color:#333">历史记录</text>
				<text class="icon" @tap="asyncData('')" style="font-size: 15px;">&#xe671;</text>
			</view>
			<view class="summer ">
				<text v-if="music.his_list.length" class="his-item" v-for="(h,i) in music.his_list" :key="i" @tap="handleInput({target:{value:h}})">{{h}}</text>
			</view>
		</view>


	</view>
</template>

<script>
	import api from '@/utils/interfaces.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
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
			this.asyncData(null)
		},
		computed: {
			...mapState({
				music: state => state.music,
			})
		},
		methods: {
			...mapMutations(['asyncMusic']),
			asyncData(msg = null) {

				const key = 'MUSIC';
				let music = uni.getStorageSync(key) || '{}';
				music = JSON.parse(music);
				let his_list = music.his_list || [];
				if (msg === '') his_list = [];
				//通过条件添加数据
				// console.log(his_list.some(e => e === msg));
				const isRight = msg && msg !== null && Array.isArray(his_list) && !his_list.some(e => e === msg)
				if (isRight) his_list.push(msg);
				music.his_list = his_list;
				this.asyncMusic(music);
				uni.setStorageSync(key, JSON.stringify(music))

			},
			handleClear() {
				this.songs = [];
				this.value = "";
			},
			handlePlay(item) {
				if (this.music.curr_music) {
					console.log(item.id, this.music.curr_music.id, item.id === this.music.curr_music.id);
					if (item.id === this.music.curr_music.id) {
						uni.navigateTo({
							url: `./music`,
							success: e => {
								this.asyncData(item.name.toString());
								this.handleClear()
							}
						})
						return;
					}
				}


				this.request({
					url: api.GET_SONG_URL,
					data: {
						id: item.id
					},
					success: async res => {
						let data = res.body.data[0];

						uni.request({
							url: `${api.GET_MUSIC_DETAIL}?ids=${data.id}`,
							method: 'GET',
							data: {},
							success: detail => {
								const image = detail.data.body.songs[0].al.picUrl;
								// item = JSON.parse(JSON.stringify(item));
								// data = JSON.parse(JSON.stringify(data));
								const params = {
									...item,
									...data,
									image
								}
								const key = 'MUSIC';
								let music = uni.getStorageSync(key) || '{}';
								music = JSON.parse(music);
								music.curr_music = params;
								this.asyncMusic(music);
								uni.setStorageSync(key, JSON.stringify(music))
								// console.log(params);
								uni.navigateTo({
									url: `./music`,
									success: e => {
										this.asyncData(item.name.toString());
										this.handleClear()
									}
								})
							},
							fail: () => {},
							complete: () => {}
						});


						// this.url = res.body.data[0].url;
						// this.init()
					},

				});
			},
			handleInput({
				target: {
					value
				}
			}) {
				this.value = value;
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

	.active:active {
		background-color: #f8f8f8;
	}

	.text-over {
		overflow: hidden; //超出一行文字自动隐藏
		text-overflow: ellipsis; //文字隐藏后添加省略号
		white-space: nowrap; //强制不换行
	}

	.search {
		// width: 100%;
		// padding: 10upx;
		border: 1px #efefef solid;
		border-radius: 40upx;
		padding: 20upx;
		display: flex;
		flex: 1;
		justify-content: flex-start;
		align-items: center;
		color: #666;

		input {
			flex: 1;
			color: #333;
			margin-left: 20upx;
		}

		.clear {
			font-size: 40upx;
		}
	}

	.lie {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 20upx 30upx;
		border-bottom: 1px solid #efefef;
		position: relative;

		.name {
			font-size: 30upx;
			color: #5b6a91;
			display: block;
			width: 90%;

		}

		.artists {
			font-size: 25upx;
			color: #666;
			display: block;
			width: 90%;

		}

		.play {
			position: absolute;
			right: 0;
			// height: 82%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #999;
			font-size: 60rpx;

		}

	}

	.history {
		display: flex;
		flex-direction: column;
		padding: 40upx 30upx;
		color: #999;

		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 35upx;
			margin: 10upx 15upx;
		}

		.summer {
			display: flex;
			flex-wrap: wrap;

			.his-item {
				border: 1upx solid $border;
				margin: 10upx 10upx;
				border-radius: 35upx;
				padding: 10upx 30upx;
				font-size: 30upx;
				color: #666;
				display: flex;
				justify-content: center;
				align-items: center;


			}
		}
	}
</style>

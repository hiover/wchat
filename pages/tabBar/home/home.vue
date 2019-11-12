<template>
	<view>
		<!-- 状态栏 -->
		<page-status></page-status>
		<!-- 正文 -->
		<view class="wapper">
			<view class="list" v-for="(list,index) in lists" :key="index">
				<view class="label">
					{{list.key}}
				</view>：
				<view class="value">
					{{list.value}}
				</view>
			</view>
			<view class="list">
				<view class="label">
					Time
				</view>：
				<view class="value">
					{{tim}}
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	import api from '../../../utils/interfaces.js'
	export default {
		data() {
			return {
				lists: [],
				tim: '',
			}
		},
		components: {},
		onLoad() {
			this.initData();
		},
		methods: {
			get_systeminfo() {
				uni.getSystemInfo({
					success: navigator => {
						for (const key in navigator) {
							const value = navigator[key];
							const is_can_render =
								typeof value !== 'object' &&
								typeof value !== 'function' &&
								value
							if (is_can_render)
								this.lists.push({
									key: key.replace(/^\S/, s => s.toUpperCase()),
									value
								})
						}
					}
				});
			},
			get_serve_info() {
				uni.request({
					url: api.GET_IP,
					success: res => {
						const serve_navigator = res.data;
						for (const key in serve_navigator) {
							const value = serve_navigator[key]
							const is_can_render =
								typeof value !== 'object' &&
								typeof value !== 'function' &&
								value
							if (is_can_render)
								this.lists.push({
									key: key.replace(/^\S/, s => s.toUpperCase()),
									value
								})
						}
					},

				});
			},
			get_time() {
				this.tim = new Date();
				setTimeout(() => {
					this.get_time()
				}, 0);
			},
			initData() {
				this.get_systeminfo();
				this.get_serve_info();
				this.get_time();
			},

		}
	}
</script>

<style lang="scss">
	.wapper {
		padding: 100upx 30upx 100upx;

		.list {
			margin: 10upx 0;
			display: flex;
			align-items: flex-start;
			justify-content: flex-start;
		}

		.label {
			font-weight: bold;

		}

		.value {
			font-weight: inherit;
			color: #333;
			line-height: 1.6em;
			word-break: break-all;
		}
	}
</style>

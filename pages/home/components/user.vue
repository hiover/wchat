<template>
	<view class="wapper">
		<view class="user">
			<!-- 头像 -->
			<!-- scaleToFill aspectFit -->
			<image :src="user.avatarUrl" mode="scaleToFill" />
			<!-- 个人信息区域 -->
			<view class="person">
				<view class="remark-name">
					<text style="margin-right: 5px;">{{user.nickName}}</text>
					<text v-if="user.gender" class="icon" style="font-size: 14px;color:#66b3e9;">&#xe614;</text>
					<text v-else class="icon" style="font-size: 12px;color:#e38480;">&#xeb3c;</text>
				</view>
				<view class="name subname">
					Name：huibikuile
				</view>
				<view class="id subname">
					WeChat ID：huibikuile
				</view>
				<view class="region subname">
					Region: China
				</view>
			</view>
		</view>
		<!-- 编辑 -->
		<view class="edit " hover-class="hover">
			<text>Edit Contact</text>
			<text class="icon allow-right">&#xe6eb;</text>
		</view>

		<view class="info">
			<view class="whatup">
				<text class="label">What's Up</text><text class="val">{{user.signature}}</text>
			</view>
			<view class="monents">
				<text>Moments</text>

				<view class="images">
					<!-- scaleToFill aspectFit -->
					<image :src="ganImage()" mode="scaleToFill"></image>
					<image :src="ganImage()" mode="scaleToFill"></image>
					<image :src="ganImage()" mode="scaleToFill"></image>
					<image :src="ganImage()" mode="scaleToFill"></image>
				</view>
				<text class="icon allow-right">&#xe6eb;</text>

			</view>
		</view>

		<view class="music active" @tap="handleGoMusic">
			<text>听音乐</text>
		</view>

	</view>
</template>

<script>
	import minix from '@/utils/minix';

	export default {
		data() {
			return {
				user: {
					"nickName": "TigerZH",
					"gender": 1,
					"language": "en",
					"signature": "",
					"city": "",
					"province": "",
					"country": "China",
					"avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoET4pvRb145Gibs3yRH8L5dxtLiblRrX2IvRJvfcklYP9GMuU3s1EA3DbF9Chv0d0QuytG4wtTzEJQ/132"
				}

			}
		},
		mixins: [minix],
		onLoad(e) {
			let {
				params
			} = e;
			if (params) {
				params = JSON.parse(params)
				console.log(params);
				this.user.nickName = params.nickName;
				this.user.avatarUrl = params.avatarUrl;
				this.user.signature = params.signature;

			}
		},
		methods: {
			handleGoMusic(m) {
				uni.navigateTo({
					url: '../music/music',
					success: res => {},
					fail: (e) => {
						console.log(e);

					}
				});
			}
		}
	}
</script>

<style lang="scss">
	

	page {
		background-color: $header;
	}
	text {
		font-size: 30upx;
	}

	.hover {
		background: #efefef;
	}

	.wapper {
		display: flex;
		flex-direction: column;
		width: 100%;




		.user {
			display: flex;
			padding: 10upx 0 35upx 35upx;
			align-items: flex-start;
			justify-content: flex-start;
			background: #fff;

			image {
				height: 120upx;
				width: 120upx;
				border-radius: 10upx;
			}

			.person {
				margin-left: 35upx;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: center;

				.remark-name {
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.subname {
					color: #666;
					font-size: 25upx;
				}
			}
		}

		.edit {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-top: 1upx solid $border;
			padding: 35upx 25upx 35upx 35upx;
			background: #fff;

			.allow-right {
				font-size: 44upx;
			}
		}

		.info {
			display: flex;
			margin-top: 35upx;
			background: #fff;
			flex-direction: column;

			.whatup {
				border-bottom: 1upx solid $border;
				font-size: 35upx;
				padding: 35upx;

				.label {
					margin-right: 15upx;
				}

				.val {
					color: #666;

				}
			}

			.monents {
				display: flex;
				padding: 35upx;
				justify-content: flex-start;
				align-items: center;

				.images {
					display: flex;

					image {
						height: 100upx;
						width: 100upx;
						margin: 10upx;

					}
				}

			}
		}

		.music {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 45upx;
			color: #333;
			font-weight: bold;
			background: #fff;
			margin-top: 20upx;
			padding: 25upx 35upx;

		}

	}
</style>

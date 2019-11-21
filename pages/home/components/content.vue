<template>
	<view class="list">
		<!-- <view :style="{display:showcommit?'flex':'none'}" class="mask" @tap.stop.prevent="showcommit=false">

		</view> -->
		<!-- 头像 -->
		<image class="avatar" :lazy-load="true" :src="useravatar" mode="scaleToFill" @tap="handleGoUser" @error="imageError"></image>
		<view class="contain">
			<!-- 昵称 -->
			<text hover-class="nickname-hover" class="nickname" @tap="handleGoUser">{{nickname}}</text>
			<!-- 文案 -->
			<rich-text v-if="copywriting" class="copywriter">
				{{copywriting}}
			</rich-text>
			<!-- 图片 视频 分享 -->
			<view v-if="monents.type" class="monents">
				<view v-if="monents.type==='share'" @tap="handleGoShare(monents.list[0])" class="mon share">
					<image style="height:50px;width:50px ;" :lazy-load="true" :src="monents.list[0].url" mode="scaleToFill" @error="imageError"></image>
					<text class="share-copywriting" style="margin: 0 0 0 10px;">{{monents.list[0].copywriting}}</text>
				</view>
				<view v-if="monents.type==='vedio'" class="mon vedio">
					<video id="myVideo" :src="monents.list[0].url" @error="videoErrorCallback" :muted="true" :loop="true" :autoplay="true"
					 :controls="true" objectFit="contain" @waiting="videoErrorCallback"></video>

				</view>
				<view v-if="monents.type==='image'" class="mon image">
					<view v-for="(item,index) in monents.list" class="box" :style="{
					  						 width:monents.list.length===1?'60%':'30%'
					  }"
					 :key="index">
						<!-- scaleToFill aspectFit -->
						<image :lazy-load="true" @tap="handlePreviewImg(item,monents.list)" :style="{
							width: '100%',
							'max-height':monents.list.length!==1&&'100px'
						}"
						 :src="item.url" mode="aspectFit" @error="imageError" />
					</view>
				</view>
			</view>
			<!-- 地址 -->
			<view class="adder" @tap="handleGoMap">
				江西.南昌
			</view>
			<!-- 操作 -->
			<view class="control">
				<view class="time">
					1分钟前
				</view>
				<!-- <view class="pop" :style="{display:showcommit?'flex':'none',width:'auto'}">

					<view class="pop-thumb">
						<text class="icon">&#xe8ab;</text>喜欢
					</view>
					<view class="pop-comment">
						<text class="icon">&#xe8bd;</text>评论
					</view>
				</view> -->

				<view class="more" @tap="showcommit=true">

					<view class="point">

					</view>

					<view style="margin-left: 5px;" class="point">

					</view>
				</view>


			</view>
			<!-- 评论 -->
			<view class="comment">
				<view class="thumb">
					<view class="person" @tap="handleGoUser">
						<text class="icon">&#xe8ab;</text><text style="margin-left: 5px;">苏苏</text>

					</view>
				</view>
				<view @tap="handleComitDiscuss" class="discuss">
					<text class="name">苏苏</text>:
					<text class="text"> 苏苏 🐶 凹</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import minix from '@/utils/minix';
	export default {
		props: {
			useravatar: {
				type: String,
				default: ''
			},
			nickname: {
				type: String,
				default: ''
			},
			copywriting: {
				type: String,
				default: ''
			},
			signature: {
				type: String,
				default: ''
			},
			monents: {
				type: Object,
				default: {}
			}

		},
		data() {
			return {
				showcommit: false
			}
		},

		mixins: [minix],
		methods: {
			handlePreviewImg(item, list) {
				uni.previewImage({
					current: item.url,
					urls: list.map(e => e.url),
					indicator: 'none',
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				})
			},
			handleGoUser() {
				const params = {
					avatarUrl: this.useravatar,
					nickName: this.nickname,
					monents: this.monents,
					signature: this.signature
				}
				uni.navigateTo({
					url: `../../../components/user?params=${JSON.stringify(params)}`,
					success: res => {},
					fail: () => {},
					complete: (e) => {
						console.log(e);
					}
				});
			},
			handleComitDiscuss() {
				console.log("应该能够弹出键盘");
				this.$emit('on-commit')
			},
			handleGoShare(list) {
				uni.navigateTo({
					url: '../../../components/webview?url=https://api.huzhihui.org.cn',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			handleGoMap() {
				uni.navigateTo({
					url: '../../../components/map',
					success: res => {},
					fail: (e) => {
						console.log(e);

					}
				});
			},
			videoErrorCallback(e) {
				console.log(e);
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}

	text {
		font-size: 30upx;
	}

	.mask {
		z-index: 1;
		position: absolute;
		height: 100%;
		width: 100%;
		opacity: 0.1;
	}

	.list {
		position: relative;
		display: flex;
		flex: 1;
		border-bottom: 1upx solid $border;
		padding: 20upx;

		.avatar {
			height: 70upx;
			width: 70upx;
			border-radius: 10upx;
			margin-right: 10upx;
		}

		.contain {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;
			margin-left: 10upx;

			.nickname {
				font-size: 30upx;
				font-weight: 900;
				color: $name;

			}

			.nickname:active {
				background: rgba($color: $name, $alpha:.1);
			}

			.nickname-hover {
				background-color: $mask;
				color: #fff;
			}

			.copywriter {
				font-size: 30upx;
			}

			.control {
				display: flex;
				width: 100%;
				justify-content: space-between;
				align-items: center;
				margin: 10upx 0;
				position: relative;

				.pop {
					display: flex;
					position: absolute;
					right: 70upx;
					background-color: $mask;
					border-radius: 10upx;
					padding: 10upx 20upx;
					color: $white;
					transition: all .8s ease;
					display: none;
					width: 0;


					.pop-thumb {
						display: flex;
						justify-content: center;
						align-items: center;
						padding: 0 20upx;
					}

					.pop-comment {
						display: flex;
						justify-content: center;
						align-items: center;
						padding: 0 20upx;
					}

				}

				.time {
					color: $tips;
					font-size: 25upx;
				}

				.more {
					padding: 15upx 20upx;
					background: $header;
					border-radius: 10upx;
					display: flex;
					align-items: center;
					justify-content: center;

					.point {
						height: 8upx;
						width: 8upx;
						border-radius: 50%;
						background-color: $name;
					}
				}
			}

			.adder {
				color: $name;
				font-size: 25upx;
			}

			.adder:active {
				background: rgba($color: $name, $alpha:.1);
			}

			.monents {
				width: 100%;
				display: flex;

				.mon {
					margin: 10upx 0 0 0;
					width: 100%;
				}


				.image {
					display: flex;
					flex-wrap: wrap;
					max-width: 90%;

					.box {
						padding: 5upx;
					}
				}

				.video {}

				.share {
					flex: 1;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					background-color: $header;
					padding: 10upx;
					margin: 10upx 0;

					.share-copywriting {
						font-size: 30upx;
					}
				}
			}

			.comment {
				background-color: $header;
				width: 100%;
				// padding: 10upx;
				position: relative;
				display: flex;
				flex-direction: column;
				margin-top: 10upx;
				box-sizing: border-box;

				.thumb {
					color: $name;
					display: flex;
					flex-wrap: wrap;
					justify-content: flex-start;
					align-items: center;
					padding: 10upx 15upx;
					// border-bottom: 1upx solid #f4f4f4;
					border-bottom: 1upx solid $commentline;

					// font-weight: bold;


				}

				.discuss {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					flex-wrap: wrap;
					padding: 10upx 15upx;

					.name {
						color: $name;
						height: 100%;
						line-height: 100%;
						margin-right: 10upx;
					}

					.name:active {
						background: rgba($color: $name, $alpha:.1);
					}

					.text {
						height: 100%;
						line-height: 100%;
					}
				}

				.discuss:active {
					background: rgba($color: $name, $alpha:.1);
				}
			}

			// 画三角形
			.comment::after {
				content: " ";
				width: 0px;
				height: 0px;
				border: 20upx solid transparent;
				border-bottom: 22upx solid $header;
				position: absolute;
				top: -34upx;
				left: 2%;
			}

		}
	}
</style>

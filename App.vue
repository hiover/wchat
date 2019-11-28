<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */


	/* 添加iconfont文字 */
	@font-face {
		font-family: 'iconfont';
		/* project id 1512466 */
		src: url('~@/static/font/font_1512466_qocvun0ssd.ttf');
		// src: url('//at.alicdn.com/t/font_1512466_qocvun0ssd.eot');
		// src: url('//at.alicdn.com/t/font_1512466_qocvun0ssd.eot?#iefix') format('embedded-opentype'),
		// 	url('//at.alicdn.com/t/font_1512466_qocvun0ssd.woff2') format('woff2'),
		// 	url('//at.alicdn.com/t/font_1512466_qocvun0ssd.woff') format('woff'),
		// 	url('//at.alicdn.com/t/font_1512466_qocvun0ssd.ttf') format('truetype'),
		// 	url('//at.alicdn.com/t/font_1512466_qocvun0ssd.svg#iconfont') format('svg');
	}

	.icon {

		font-family: iconfont;
	}



	page {
		position: relative;
		background-color: #fff;
	}

	.active:active {
		background: rgba($color: $name, $alpha:.1);
	}
</style>

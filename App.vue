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

<style>
	/*每个页面公共css */
	/* 添加iconfont文字 */
	@font-face {
		font-family: 'iconfont';
		/* project id 1512466 */
		src: url('//at.alicdn.com/t/font_1512466_y707xgjgj4m.eot');
		src: url('//at.alicdn.com/t/font_1512466_y707xgjgj4m.eot?#iefix') format('embedded-opentype'),
			url('//at.alicdn.com/t/font_1512466_y707xgjgj4m.woff2') format('woff2'),
			url('//at.alicdn.com/t/font_1512466_y707xgjgj4m.woff') format('woff'),
			url('//at.alicdn.com/t/font_1512466_y707xgjgj4m.ttf') format('truetype'),
			url('//at.alicdn.com/t/font_1512466_y707xgjgj4m.svg#iconfont') format('svg');
	}

	.icon {
		font-size: 60upx;
		color: #fff;
		font-family: iconfont;
	}

	page {
		position: relative;
		background-color: #fff;
	}
</style>

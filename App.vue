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
		src: url('//at.alicdn.com/t/font_1512466_cz3nh9ssddm.eot');
		src: url('//at.alicdn.com/t/font_1512466_cz3nh9ssddm.eot?#iefix') format('embedded-opentype'),
			url('//at.alicdn.com/t/font_1512466_cz3nh9ssddm.woff2') format('woff2'),
			url('//at.alicdn.com/t/font_1512466_cz3nh9ssddm.woff') format('woff'),
			url('//at.alicdn.com/t/font_1512466_cz3nh9ssddm.ttf') format('truetype'),
			url('//at.alicdn.com/t/font_1512466_cz3nh9ssddm.svg#iconfont') format('svg');
	}

	.icon {

		font-family: iconfont;
	}


	page {
		position: relative;
		background-color: #fff;
	}
</style>

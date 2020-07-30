<template>
	<el-aside :width="width + 'px'">
		<div class="md-logo">
			<img src="@/assets/images/logo.png" alt="logo">
			<span>Vue Admin Template</span>
		</div>
		<div class="md-user-data" :style="{backgroundImage: 'url(' + cardBackgroundImg +')'}">
			<img src="@/assets/images/avatar/avatar.jpg" alt="avatar"/>
			<div class="md-username">
				<span>Dr. Codex Lantern</span>
				<span>Toronto, Canada</span>
			</div>
		</div>
	</el-aside>
</template>

<script>
	export default {
		name: 'MainAside',
		data() {
			return {
				width: 275,
				cardBackgroundImg: require('@/assets/images/cover-2-lg.png')
			};
		},
		created() {
		},
		computed: {},
		methods: {},
		watch: {}
	};
</script>

<style scoped lang="scss">
	.el-aside {
		background-image: linear-gradient(270deg, rgba(51, 148, 225, .18), transparent);
		background-color: #584475;
		height: 100vh;

		.md-logo {
			height: 60px;
			box-shadow: 0 0 28px 0 rgba(0, 0, 0, .13);
			padding: 0 2rem;
			background-image: linear-gradient(270deg, rgba(51, 148, 225, .18), transparent);
			background-color: #584475;
			color: white;
			display: flex;
			align-items: center;
			justify-content: center;

			img {
				width: 28px;
				height: 28px;
			}

			span {
				padding-left: 5px;
			}
		}

		.md-user-data {
			height: 150px;
			background-size: auto 100%;
			background-repeat: no-repeat;
			background-position: center;
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;

			img {
				width: 60px;
				height: 60px;
				border-radius: 50%;
			}
		}
	}
</style>
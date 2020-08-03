<template>
	<el-header>
		<el-button type="text" size="medium" class="md-aside-icon-btn" @click="onClick">
			<i :class="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
		</el-button>
	</el-header>
</template>

<script>
	export default {
		name: 'MainHeader',
		data() {
			return {
				collapse: false
			};
		},
		created() {
		},
		computed: {},
		methods: {
			onClick () {
				this.collapse = !this.collapse
				this.$emit('collapse', this.collapse)
			}
		},
		watch: {}
	};
</script>

<style scoped lang="scss">
	.el-header {
		background-color: #fff;
		box-shadow: 0 0 28px 0 rgba(86, 61, 124, .13);
		display: flex;
		flex: 0 0 auto;
		align-items: center;
		height: 4.125rem;
		position: relative;
		z-index: 1000;

		.md-aside-icon-btn {
			i {
				color: #999999;
				font-size: 20px;
			}
		}
	}
</style>
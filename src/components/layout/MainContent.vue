<template>
	<el-main>
		<slot></slot>
	</el-main>
</template>

<script>
	export default {
		name: 'MainContent',
		data() {
			return {};
		},
		created() {
		},
		computed: {},
		methods: {},
		watch: {}
	};
</script>

<style scoped lang="scss">
	.el-main {
		margin: 0;
		padding: 0;
	}
</style>
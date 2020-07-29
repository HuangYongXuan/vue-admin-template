<template>
	<el-container class="md-MainLayout">
		<el-header>Header</el-header>
		<el-container>
			<el-aside width="200px">Aside</el-aside>
			<el-container>
				<el-main>Main</el-main>
				<el-footer>Footer</el-footer>
			</el-container>
		</el-container>
	</el-container>
</template>

<script>
	export default {
		name: 'MainLayout',
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
	.md-MainLayout {
	}
</style>
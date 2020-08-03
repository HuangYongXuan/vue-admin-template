<template>
	<el-container class="md-MainLayout">
		<main-aside ref="aside"/>
		<el-container direction="vertical">
			<main-header  @collapse="onCollapse" ref="header"/>
			<main-content>
				<router-view/>
			</main-content>
			<main-footer/>
		</el-container>
	</el-container>
</template>

<script>
	import MainHeader from '@/components/layout/MainHeader';
	import MainAside from '@/components/layout/MainAside';
	import MainFooter from '@/components/layout/MainFooter';
	import MainContent from '@/components/layout/MainContent';

	export default {
		name: 'MainLayout',
		components: {MainContent, MainFooter, MainAside, MainHeader},
		data() {
			return {};
		},
		created() {
		},
		computed: {},
		methods: {
			onCollapse (b) {
				this.$refs.aside.collapseAction(b)
			}
		},
		watch: {}
	};
</script>

<style scoped lang="scss">
	.md-MainLayout {
		background: #FAF8FB;

		.el-container {
			height: 100vh;
		}
	}
</style>
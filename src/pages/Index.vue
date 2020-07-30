<template>
	<main-layout>

	</main-layout>
</template>

<script>
	import MainLayout from '@/components/layout/MainLayout';
	export default {
		name: 'Index',
		components: {MainLayout},
		data() {
			return {};
		},
		mounted() {
			this.$store.dispatch('login').then(data => {
				console.info(data)
			})
		},
		computed: {},
		methods: {},
		watch: {}
	};
</script>

<style scoped lang="scss">
	.md-index {
	}
</style>
<template>
	<div class="md-index">
		123
	</div>
</template>

<script>
	export default {
		name: 'Index',
		data() {
			return {};
		},
		mounted() {
			this.$store.dispatch('login')
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
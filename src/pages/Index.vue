<template>
	<div class="md-index">
		123
	</div>
</template>

<script>
	import Request from '@/common/Request';

	export default {
		name: 'Index',
		data() {
			return {};
		},
		created() {
			Request.get('/ads', {}, {needToken: true})
		},
		computed: {},
		methods: {},
		watch: {}
	};
</script>

<style scoped lang="scss">
	.md-index{
	}
</style>
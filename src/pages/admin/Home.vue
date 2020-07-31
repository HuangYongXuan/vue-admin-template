<template>
	<div class="md-Home">
		<menu-list/>
	</div>
</template>

<script>
	import MenuList from '@/pages/admin/system/MenuList';
	export default {
		name: 'Home',
		components: {MenuList},
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
	.md-Home {
	}
</style>
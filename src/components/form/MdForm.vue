<template>
	<el-form :model="model" :rules="rules" v-bind="$attrs" @submit.native.prevent="onSubmit" ref="form">
		<slot/>
	</el-form>
</template>

<script>
	export default {
		name: 'MdForm',
		props: {
			model: Object,
			rules: Object
		},
		data() {
			return {};
		},
		created() {
		},
		computed: {},
		methods: {
			onSubmit(e) {
				this.$refs.form.validate((valid) => {
					if (valid) this.$emit('submit', e);
				});
			}
		},
		watch: {}
	};
</script>

<style scoped lang="scss">
	.md-MdForm {
	}
</style>
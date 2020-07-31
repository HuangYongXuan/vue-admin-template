export default {
	props: {
		value: {
			type: Object | String | Number | Array | Boolean
		},
		formRef: {
			type: String,
			default: 'form'
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			data: this.value
		};
	},
	created() {
	},
	methods: {
		onSubmit() {
			this.$emit('submit', this.data);
		},
		watchData() {

		},
		watchValue() {

		},
		toSubmit() {
			this.$refs[this.formRef].onSubmit();
		},
		h() {

		}
	},
	watch: {
		async value(oldVal) {
			await this.$nextTick();
			this.data = oldVal;
			this.watchValue(oldVal);
		},
		async data(oldVal) {
			await this.$nextTick();
			this.$emit('input', oldVal);
			this.watchData(oldVal);
		}
	}
};

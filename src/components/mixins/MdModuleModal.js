/**
 * @module      vue 模块弹出框混入
 * @author      hyx
 * @date        2020/1/2 10:33 上午
 * @version     1.0
 */
export default {
	data() {
		return {
			mode: '',
			data: {},
			visible: false,
			confirmLoading: false,
			formRef: 'form'
		};
	},
	computed: {
		infoMod() {
			return this.mode === 'info';
		}
	},
	methods: {
		action(data = {}, mode = '') {
			this.mode = mode;
			this.data = this.$utils.deepCopy(data);
			this.visible = true;
		},
		onSuccess() {
			this.$refs[this.formRef].onSubmit();
		}
	}
};

export default {
	props: {
		mdActive: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			show: this.mdActive
		};
	},
	methods: {
		showWatch() {
		},
		mdActiveWatch() {
		}
	},
	watch: {
		mdActive(n) {
			this.show = n;
			this.$nextTick(() => {
				this.mdActiveWatch();
			});
		},
		show(n) {
			this.$emit('update:mdActive', n);
			this.$nextTick(() => {
				this.showWatch();
			});
		}
	}
};

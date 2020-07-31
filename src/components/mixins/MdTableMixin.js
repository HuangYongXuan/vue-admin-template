import {checkPermission} from '@/common/Utils';

export default {
	props: {
		permsName: {
			type: String
		}
	},
	data() {
		return {
			loading: false,
			spinning: false,
			autoLoad: true, // 是否自动获取数据
			selectedRowKeys: [],
			isChangeRouter: false,
			query: {
				pageNum: 1,
				pageSize: 20
			},
			table: {
				rows: [],
				count: 0
			},
			dialog: {
				status: {
					create: false,
					edit: false,
					delete: false,
					info: false
				},
				data: {
					old: {},
					create: {},
					edit: {},
					delete: {},
					info: {}
				}
			},
			perms: {
				list: checkPermission(this.permsName + 'list'),
				edit: checkPermission(this.permsName + 'edit'),
				add: checkPermission(this.permsName + 'add'),
				remove: checkPermission(this.permsName + 'remove'),
				info: checkPermission(this.permsName + 'info')
			},
			rowSelection: {selectedRowKeys: [], onChange: this.onSelectChange},
			dataLoadFunc: () => {
				return Promise.resolve();
			}
		};
	},
	computed: {
		isSelected() {
			return this.selectedRowKeys && this.selectedRowKeys.length > 0;
		}
	},
	created() {
		if (this.autoLoad) {
			// this.query = Object.assign({}, this.$route.query, this.query);
			this.getTableData();
		}
	},
	methods: {
		getTableData(isSearch) {
			if (isSearch === true) this.query.pageNum = 1;
			this.loading = true;
			let result = this.dataLoadFunc();
			result.then && result.then(res => {
				this.$utils.responseHandler(res).then(({data}) => {
					this.removeSelectedRowKeys();
					if (this.customResponseData && this.customResponseData instanceof Function) {
						this.customResponseData(data);
					} else {
						this.table.rows = data.rows || data;
						this.table.count = data.total;
					}
				});
			}).finally(() => this.loading = false);
		},
		resetForm() {
			let keys = ['pageNum', 'pageSize'];
			for (let key in this.query) {
				if (keys.indexOf(key) === -1) {
					this.query[key] = undefined;
				}
			}
			this.$nextTick(() => {
				this.getTableData();
			});
		},
		onSelectChange(selectedRowKeys) {
			this.rowSelection.selectedRowKeys = selectedRowKeys;
			this.selectedRowKeys = selectedRowKeys;
		},
		removeSelectedRowKeys() {
			this.onSelectChange([]);
		},
		expandIcon(vNode) {
			if (vNode.record.children && vNode.record.children.length > 0) {
				if (vNode.expanded) {
					return (<a class="md-expanded-icon" onClick={e => {
						vNode.onExpand(vNode.record, e);
					}}>
						<a-icon type="down-circle" theme="filled"/>
					</a>);
				} else {
					return (<a class="md-expanded-icon" onClick={e => {
						vNode.onExpand(vNode.record, e);
					}}>
						<a-icon type="up-circle" theme="filled"/>
					</a>);
				}
			}
			return (<span style={{marginRight: 8}}/>);
		},
		onColumnChange(columns) {
			this.columns = columns;
		}
	},
	watch: {
		table: {
			handler() {
				if (!this.isChangeRouter) {
					return;
				}
				this.$router.replace({
					...this.$route,
					name: this.$route.name,
					query: Object.assign({}, this.$route.query, this.query)
				});
			},
			deep: true,
			immediate: true
		}
	}
};

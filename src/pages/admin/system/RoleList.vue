<template>
	<div class="md-role-list md-content">
		<vxe-toolbar>
			<template v-slot:buttons>
				<el-button @click="$refs.xTable.setAllCheckboxRow(true)">全部</el-button>
				<el-button @click="$refs.xTable.clearCheckboxRow()">清除选择</el-button>
				<el-button type="danger" v-if="selectorData && selectorData.length > 0">删除选择</el-button>
				<el-button @click="save">保存</el-button>
			</template>
			<template #tools>
				<md-form :model="query" @submit="getData" inline>
					<el-form-item>
						<el-input v-model="query.name" placeholder="输入名称"/>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" icon="el-icon-search" native-type="submit">搜索</el-button>
						<el-button type="success" icon="el-icon-plus" @click="add">创建角色</el-button>
					</el-form-item>
				</md-form>
			</template>
		</vxe-toolbar>

		<vxe-grid :data="roleList" :columns="columns" border ref="xTable" column-key>
			<template #canDelete="{row}">
				{{row.canDelete}}
			</template>
		</vxe-grid>
	</div>
</template>

<script>
	import MdForm from '@/components/form/MdForm';
	import roleApi from '@/common/apis/role';
	import moment from 'moment';
	import Sortable from 'sortablejs';

	export default {
		name: 'RoleList',
		components: {MdForm},
		data() {
			return {
				query: {},
				roleList: [],
				selectorData: [],
				columns: [
					{type: 'checkbox', width: 120, align: 'center', resizable: true},
					{type: 'seq', width: '60', align: 'center', resizable: true},
					{field: 'name', title: '名称', align: 'center', resizable: true},
					{field: 'displayName', title: '显示名称', align: 'center', resizable: true},
					{field: 'isDefault', title: '是否默认', align: 'center', resizable: true},
					{field: 'canDelete', title: '能否删除', align: 'center', resizable: true, slots: {default: 'canDelete'}},
					{field: 'createdAt', title: '创建时间', align: 'center', formatter: this.dateFormatter}
				]
			};
		},
		created() {
			this.getData();
			this.columnDrop();
		},
		beforeDestroy() {
			if (this.sortable) {
				this.sortable.destroy();
			}
		},
		computed: {},
		methods: {
			columnDrop() {
				this.$nextTick(() => {
					let xTable = this.$refs.xTable;
					this.sortable = Sortable.create(xTable.$el.querySelector('.body--wrapper>.vxe-table--header .vxe-header--row'), {
						handle: '.vxe-header--column:not(.col--fixed)',
						onEnd: ({newIndex, oldIndex}) => {
							let currRow = this.columns.splice(oldIndex, 1)[0]
							this.columns.splice(newIndex, 0, currRow)
						}
					});
				});
			},
			getData() {
				roleApi.list(this.query).then(res => {
					this.$utils.responseHandler(res).then((data) => {
						this.roleList = data;
					});
				});
			},
			add() {

			},
			edit() {

			},
			remove() {

			},
			onSelect({records}) {
				this.selectorData = records;
			},
			dateFormatter({cellValue}) {
				return moment(cellValue).format('YYYY-MM-DD HH:mm:ss');
			},
			save() {
				let id = this.$refs.xTable.$props.id;
				console.info(id, this.$refs.xTable.getColumns());
			}
		},
		watch: {}
	};
</script>

<style scoped lang="scss">
.md-role-list {
}
</style>
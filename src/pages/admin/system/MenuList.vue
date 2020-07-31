<template>
	<div class="md-content md-MenuList">
		<md-form :model="query" @submit="getData" inline>
			<el-form-item>
				<el-input v-model="query.menuName" placeholder="输入菜单名称"/>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" native-type="submit">搜索</el-button>
				<el-button type="success" icon="el-icon-plus">创建菜单</el-button>
			</el-form-item>
		</md-form>
		<el-table :data="listTree" row-key="id" border>
			<el-table-column prop="menuName" label="菜单名称" align="left"/>
			<el-table-column prop="path" label="路由路径" align="center"/>
			<el-table-column prop="name" label="路由名称" align="center"/>
			<el-table-column prop="component" label="组件" align="center"/>
			<el-table-column prop="menuType" label="菜单类型" align="center"/>
			<el-table-column prop="perms" label="权限标示" align="center"/>
			<el-table-column prop="sort" label="排序" align="center"/>
			<el-table-column label="操作" align="right">
				<template slot-scope="record">
					<el-button size="mini" type="primary" @click="edit(record)">编辑</el-button>
					<el-button size="mini" type="danger" @click="remove(record)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<menu-list-dialog ref="dialog"/>
	</div>
</template>

<script>
	import menuApi from '@/common/apis/menu';
	import MdForm from '@/components/form/MdForm';
	import MenuListDialog from '@/pages/admin/system/modules/MenuListDialog';

	export default {
		name: 'MenuList',
		components: {MenuListDialog, MdForm},
		data() {
			return {
				query: {
					menuName: undefined
				},
				listTree: []
			};
		},
		created() {
			this.getData();
		},
		computed: {},
		methods: {
			getData() {
				menuApi.list(this.query).then(res => {
					this.$utils.responseHandler(res).then(data => {
						this.listTree = data;
					});
				});
			},
			edit({row}) {
				console.info(row);
			},
			remove({row}) {
				this.$confirm(`是否删${row.menuName}菜单`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					menuApi.remove(row.id).then(res => {
						this.$utils.responseHandler(res, true, true).then(() => {
							this.getData();
						});
					});
				});
			}
		},
		watch: {}
	};
</script>

<style scoped lang="scss">
	.md-MenuList {
	}
</style>